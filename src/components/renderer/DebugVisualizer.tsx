import React, { useCallback, useContext, useMemo } from "react";
import AnimatedCanvas from "../AnimatedCanvas";
import { decibelsToAmplitude, binarySearchIndex, sampleSegmentedFunction, smoothstep, mapLinear } from "../../utils";
import { parseRhythmString, RhythmString } from "../../RhythmString";
import { ErrorHandlerContext, ErrorRecovery } from "../../error";

type CanvasData = {
	barDuration: number;
	audioAnalysis?: SpotifyAudioAnalysis;
	rhythmString: RhythmString | null;
};

type RendererState =
	| {
			isError: true;
	  }
	| {
			isError: false;
	  };

type Area = { x: number; y: number; width: number; height: number };

type Section = {
	name: string;
	render: (
		ctx: CanvasRenderingContext2D,
		audio: { analysis: SpotifyAudioAnalysis; rhythm: RhythmString },
		time: { start: number; end: number; current: number },
		area: Area
	) => void;
} & (
	| {
			layer: "background" | "overlay";
	  }
	| {
			layer: "content";
			height: number;
	  }
);

const TIME_WINDOW = [1, 2];

const SECTION_SPACING = 20;
const SECTION_TITLE_SIZE = 20;
const SECTION_TITLE_SPACING = 10;
const SECTIONS: Section[] = [
	{
		name: "Beats",
		layer: "background",
		render: (ctx, audio, time, area) => {
			const start = binarySearchIndex(audio.analysis.beats, b => b.start, time.start);
			const end = binarySearchIndex(audio.analysis.beats, b => b.start, time.end);

			ctx.lineWidth = 1;
			ctx.strokeStyle = "#FFFFFF33";
			ctx.beginPath();
			for (let i = start; i <= end; i++) {
				const x = mapLinear(audio.analysis.beats[i].start, time.start, time.end, area.x, area.x + area.width);

				ctx.moveTo(x, area.y);
				ctx.lineTo(x, area.y + area.height);
			}
			ctx.stroke();
		}
	},
	{
		name: "Bars",
		layer: "background",
		render: (ctx, audio, time, area) => {
			const start = binarySearchIndex(audio.analysis.bars, b => b.start, time.start);
			const end = binarySearchIndex(audio.analysis.bars, b => b.start, time.end);

			ctx.lineWidth = 3;
			ctx.strokeStyle = "#FFFFFF66";
			ctx.beginPath();
			for (let i = start; i <= end; i++) {
				const x = mapLinear(audio.analysis.bars[i].start, time.start, time.end, area.x, area.x + area.width);

				ctx.moveTo(x, area.y);
				ctx.lineTo(x, area.y + area.height);
			}
			ctx.stroke();
		}
	},
	{
		name: "Position",
		layer: "overlay",
		render: (ctx, audio, time, area) => {
			ctx.lineWidth = 5;
			ctx.strokeStyle = ctx.fillStyle = "white";
			ctx.beginPath();

			const x = mapLinear(time.current, time.start, time.end, area.x, area.x + area.width);

			ctx.moveTo(x, area.y);
			ctx.lineTo(x, area.y + area.height);
			ctx.stroke();

			const triangleSize = 10;

			ctx.beginPath();
			ctx.moveTo(x - triangleSize, area.y);
			ctx.lineTo(x + triangleSize, area.y);
			ctx.lineTo(x, area.y + triangleSize);
			ctx.lineTo(x - triangleSize, area.y);

			ctx.moveTo(x - triangleSize, area.y + area.height);
			ctx.lineTo(x + triangleSize, area.y + area.height);
			ctx.lineTo(x, area.y + area.height - triangleSize);
			ctx.lineTo(x - triangleSize, area.y + area.height);
			ctx.fill();
		}
	},
	{
		name: "Loudness",
		layer: "content",
		height: 1,
		render: (ctx, audio, time, area) => {
			const start = binarySearchIndex(audio.analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(audio.analysis.segments, b => b.start, time.end);

			const transformLoudness = (l: number) => decibelsToAmplitude(l);

			ctx.lineWidth = 2;
			ctx.strokeStyle = "white";
			ctx.beginPath();

			for (let i = start; i <= end + 1 && i < audio.analysis.segments.length; i++) {
				const segment = audio.analysis.segments[i];

				const xStart = mapLinear(segment.start, time.start, time.end, area.x, area.x + area.width);
				const yStart = mapLinear(transformLoudness(segment.loudness_start), 0, 1, area.y + area.height, area.y);
				const xMax = mapLinear(
					segment.start + segment.loudness_max_time,
					time.start,
					time.end,
					area.x,
					area.x + area.width
				);
				const yMax = mapLinear(transformLoudness(segment.loudness_max), 0, 1, area.y + area.height, area.y);

				if (i === start) {
					ctx.moveTo(xStart, yStart);
				} else {
					ctx.lineTo(xStart, yStart);
				}

				ctx.lineTo(xMax, yMax);

				if (i === audio.analysis.segments.length - 1) {
					const xEnd = mapLinear(segment.start + segment.duration, time.start, time.end, area.x, area.x + area.width);
					const yEnd = mapLinear(transformLoudness(segment.loudness_end), 0, 1, area.y + area.height, area.y);

					ctx.lineTo(xEnd, yEnd);
				}
			}

			ctx.stroke();
		}
	},
	{
		name: "Confidence",
		layer: "content",
		height: 0.25,
		render: (ctx, audio, time, area) => {
			const start = binarySearchIndex(audio.analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(audio.analysis.segments, b => b.start, time.end);

			ctx.beginPath();

			for (let i = start; i <= end; i++) {
				const segment = audio.analysis.segments[i];

				const xStart = mapLinear(segment.start, time.start, time.end, area.x, area.x + area.width);
				const xEnd = mapLinear(segment.start + segment.duration, time.start, time.end, area.x, area.x + area.width);

				ctx.fillStyle = `rgba(255, 255, 255, ${segment.confidence})`;
				ctx.fillRect(xStart, area.y, xEnd - xStart, area.height);
			}

			ctx.fill();
		}
	},
	{
		name: "Timbre",
		layer: "content",
		height: 1.5,
		render: (ctx, audio, time, area) => {
			const rowHeight = area.height / 12;

			const start = binarySearchIndex(audio.analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(audio.analysis.segments, b => b.start, time.end);

			for (let t = 0; t < 12; t++) {
				const goldenRatio = (Math.sqrt(5) - 1) / 2;
				const hue = t * goldenRatio;

				ctx.beginPath();

				for (let i = start; i <= end; i++) {
					const segment = audio.analysis.segments[i];
					const value = mapLinear(Math.tanh(0.02 * segment.timbre[t]), -1, 1, 0, 1);

					const xStart = mapLinear(segment.start, time.start, time.end, area.x, area.x + area.width);
					const xEnd = mapLinear(segment.start + segment.duration, time.start, time.end, area.x, area.x + area.width);

					const y = area.y + (t / 12) * area.height;

					ctx.fillStyle = `hsla(${hue * 360}, 100%, 70%, ${value})`;
					ctx.fillRect(xStart, y, xEnd - xStart, rowHeight);
				}

				ctx.fill();
			}
		}
	},
	{
		name: "Pitches",
		layer: "content",
		height: 1.5,
		render: (ctx, audio, time, area) => {
			const rowHeight = area.height / 12;

			const start = binarySearchIndex(audio.analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(audio.analysis.segments, b => b.start, time.end);

			for (let p = 0; p < 12; p++) {
				const hue = p / 12;

				ctx.beginPath();

				for (let i = start; i <= end; i++) {
					const segment = audio.analysis.segments[i];

					const xStart = mapLinear(segment.start, time.start, time.end, area.x, area.x + area.width);
					const xEnd = mapLinear(segment.start + segment.duration, time.start, time.end, area.x, area.x + area.width);

					const y = area.y + (p / 12) * area.height;

					ctx.fillStyle = `hsla(${hue * 360}, 100%, 70%, ${segment.pitches[p]})`;
					ctx.fillRect(xStart, y, xEnd - xStart, rowHeight);
				}

				ctx.fill();
			}
		}
	},
	{
		name: "Rhythm",
		layer: "content",
		height: 0.5,
		render: (ctx, audio, time, area) => {
			const markerHeight = area.height / audio.rhythm.length;
			const markerWidth = Math.min(markerHeight, 20);

			const timePad = (markerWidth / 2 / area.width) * (time.end - time.start);

			ctx.fillStyle = "white";
			ctx.beginPath();

			for (let c = audio.rhythm.length - 1; c >= 0; c--) {
				const start = binarySearchIndex(audio.rhythm[c], r => r, time.start - timePad);
				const end = binarySearchIndex(audio.rhythm[c], r => r, time.end + timePad);

				for (let i = start; i <= end; i++) {
					const x = mapLinear(audio.rhythm[c][i], time.start, time.end, area.x, area.x + area.width);
					const y = area.y + c * markerHeight;

					ctx.rect(x - markerWidth / 2, y, markerWidth, markerHeight);
				}
			}

			ctx.fill();
		}
	}
];

export default function DebugVisualizer(props: {
	isEnabled: boolean;
	themeColor: Spicetify.Color;
	audioAnalysis?: SpotifyAudioAnalysis;
}) {
	const onError = useContext(ErrorHandlerContext);

	const barDuration = useMemo(() => {
		if (!props.audioAnalysis) return 1;
		return props.audioAnalysis.bars.reduce((acc, val) => acc + val.duration, 0) / props.audioAnalysis.bars.length;
	}, [props.audioAnalysis]);

	const rhythmString = useMemo(() => {
		if (!props.audioAnalysis) return null;
		return parseRhythmString(props.audioAnalysis.track.rhythmstring);
	}, [props.audioAnalysis]);

	const onInit = useCallback((ctx: CanvasRenderingContext2D | null): RendererState => {
		if (!ctx) {
			onError("Error: 2D rendering is not supported", ErrorRecovery.NONE);
			return { isError: true };
		}

		return {
			isError: false
		};
	}, []);

	const onResize = useCallback((ctx: CanvasRenderingContext2D | null, state: RendererState) => {
		if (state.isError || !ctx) return;
	}, []);

	const onRender = useCallback((ctx: CanvasRenderingContext2D | null, data: CanvasData, state: RendererState) => {
		if (state.isError || !ctx || !data.audioAnalysis || !data.rhythmString) return;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		const progress = Spicetify.Player.getProgress() / 1000;
		const windowStart = progress - TIME_WINDOW[0] * data.barDuration;
		const windowEnd = progress + TIME_WINDOW[1] * data.barDuration;
		const time = {
			start: windowStart,
			end: windowEnd,
			current: progress
		};

		const renderTitle = (title: string, y: number, height: number) => {
			ctx.save();

			ctx.font = `${SECTION_TITLE_SIZE}px sans-serif`;
			ctx.textAlign = "center";
			ctx.fillStyle = "white";

			ctx.rotate((Math.PI * 3) / 2);
			ctx.fillText(title, -(y + height / 2), SECTION_TITLE_SIZE, height);

			ctx.restore();
		};

		const renderSection = (section: Section, area: Area) => {
			ctx.save();

			ctx.beginPath();
			ctx.rect(area.x, area.y, area.width, area.height);
			ctx.clip();

			section.render(ctx, { analysis: data.audioAnalysis!, rhythm: data.rhythmString! }, time, area);

			ctx.restore();
		};

		for (const section of SECTIONS) {
			if (section.layer !== "background") continue;

			renderSection(section, {
				x: SECTION_TITLE_SIZE + SECTION_TITLE_SPACING,
				y: 0,
				width: ctx.canvas.width - SECTION_TITLE_SIZE - SECTION_TITLE_SPACING,
				height: ctx.canvas.height
			});
		}

		const contentSections = SECTIONS.filter(s => s.layer === "content");

		const contentSpace = ctx.canvas.height - SECTION_SPACING * (contentSections.length - 1);
		const totalHeight = contentSections.reduce((acc, val) => acc + val.height, 0);

		let currentHeight = 0;
		let currentCount = 0;

		for (const section of contentSections) {
			const yStart = mapLinear(currentHeight, 0, totalHeight, 0, contentSpace) + currentCount * SECTION_SPACING;
			const yEnd =
				mapLinear(currentHeight + section.height, 0, totalHeight, 0, contentSpace) + currentCount * SECTION_SPACING;

			currentHeight += section.height;
			currentCount++;

			renderSection(section, {
				x: SECTION_TITLE_SIZE + SECTION_TITLE_SPACING,
				y: yStart,
				width: ctx.canvas.width - SECTION_TITLE_SIZE - SECTION_TITLE_SPACING,
				height: yEnd - yStart
			});

			renderTitle(section.name, yStart, yEnd - yStart);

			if (currentCount < contentSections.length) {
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#AAAAAA";

				ctx.beginPath();
				ctx.moveTo(SECTION_SPACING / 2, yEnd + SECTION_SPACING / 2);
				ctx.lineTo(ctx.canvas.width - SECTION_SPACING / 2, yEnd + SECTION_SPACING / 2);
				ctx.stroke();
			}
		}

		for (const section of SECTIONS) {
			if (section.layer !== "overlay") continue;

			renderSection(section, {
				x: SECTION_TITLE_SIZE + SECTION_TITLE_SPACING,
				y: 0,
				width: ctx.canvas.width - SECTION_TITLE_SIZE - SECTION_TITLE_SPACING,
				height: ctx.canvas.height
			});
		}
	}, []);

	return (
		<AnimatedCanvas
			isEnabled={props.isEnabled}
			data={{ audioAnalysis: props.audioAnalysis, rhythmString, barDuration }}
			contextType="2d"
			onInit={onInit}
			onResize={onResize}
			onRender={onRender}
			style={{
				width: "100%",
				height: "100%"
			}}
		/>
	);
}
