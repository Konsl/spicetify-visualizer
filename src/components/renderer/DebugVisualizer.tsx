import React, { useCallback, useContext, useMemo } from "react";
import AnimatedCanvas from "../AnimatedCanvas";
import { decibelsToAmplitude, binarySearchIndex, mapLinear } from "../../math";
import { parseRhythmString, RhythmString } from "../../RhythmString";
import { ErrorHandlerContext, ErrorRecovery } from "../../error";
import { RendererProps, TrackData } from "../../defs";
import { AudioSyncManager } from "../../audio-sync";

type CanvasData = {
	barDuration: number;
	processedTrackData: ProcessedTrackData;
	supportedSections: Section[];
};

type RendererState =
	| {
			isError: true;
	  }
	| {
			isError: false;
	  };

type Area = { x: number; y: number; width: number; height: number };
type ProcessedTrackData = { trackData: TrackData; rhythm?: RhythmString };

type Section = {
	name: string;
	isSupported: (audio: ProcessedTrackData) => boolean;
	render: (
		ctx: CanvasRenderingContext2D,
		audio: ProcessedTrackData,
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

const SECTION_SPACING = 10;
const SECTION_TITLE_SIZE = 20;
const SECTION_TITLE_SPACING = 10;
const SECTIONS: Section[] = [
	{
		name: "Beats",
		layer: "background",
		isSupported: audio => {
			return !!audio.trackData.audioAnalysis?.value || !!audio.trackData.beats?.value;
		},
		render: (ctx, audio, time, area) => {
			const beats = audio.trackData.audioAnalysis?.value?.beats || audio.trackData.beats?.value?.beats;
			if (!beats) return;

			const start = binarySearchIndex<(typeof beats)[0]>(
				beats,
				b => ("start" in b ? b.start : (b.time ?? 0)),
				time.start
			);
			const end = binarySearchIndex<(typeof beats)[0]>(
				beats,
				b => ("start" in b ? b.start : (b.time ?? 0)),
				time.end
			);

			ctx.lineWidth = 1;
			ctx.strokeStyle = "#FFFFFF33";
			ctx.beginPath();
			for (let i = start; i <= end; i++) {
				const beat = beats[i];
				const beatTime = "start" in beat ? beat.start : (beat.time ?? 0);

				const x = mapLinear(beatTime, time.start, time.end, area.x, area.x + area.width);

				ctx.moveTo(x, area.y);
				ctx.lineTo(x, area.y + area.height);
			}
			ctx.stroke();
		}
	},
	{
		name: "Bars",
		layer: "background",
		isSupported: audio => {
			return !!audio.trackData.audioAnalysis?.value || !!audio.trackData.beats?.value;
		},
		render: (ctx, audio, time, area) => {
			const bars =
				audio.trackData.audioAnalysis?.value?.bars ||
				audio.trackData.beats?.value?.beats?.filter(b => b.value === 1);
			if (!bars) return;

			const start = binarySearchIndex<(typeof bars)[0]>(
				bars,
				b => ("start" in b ? b.start : (b.time ?? 0)),
				time.start
			);
			const end = binarySearchIndex<(typeof bars)[0]>(
				bars,
				b => ("start" in b ? b.start : (b.time ?? 0)),
				time.end
			);

			ctx.lineWidth = 3;
			ctx.strokeStyle = "#FFFFFF66";
			ctx.beginPath();
			for (let i = start; i <= end; i++) {
				const bar = bars[i];
				const barTime = "start" in bar ? bar.start : (bar.time ?? 0);

				const x = mapLinear(barTime, time.start, time.end, area.x, area.x + area.width);

				ctx.moveTo(x, area.y);
				ctx.lineTo(x, area.y + area.height);
			}
			ctx.stroke();
		}
	},
	{
		name: "Position",
		layer: "overlay",
		isSupported: _audio => true,
		render: (ctx, _audio, time, area) => {
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
		name: "Waveform",
		layer: "content",
		height: 1,
		isSupported: audio => !!audio.trackData.threebandWaveforms?.value,
		render: (ctx, audio, time, area) => {
			const waveform = audio.trackData.threebandWaveforms?.value;
			if (!waveform || !waveform.sampleWindowSizeMs) return;

			const sampleRate = 1000 / waveform.sampleWindowSizeMs;
			const start = Math.max(0, Math.floor(time.start * sampleRate));
			const end = Math.max(0, Math.floor(time.end * sampleRate));

			const lows = waveform.lows ?? [];
			const mids = waveform.mids ?? [];
			const highs = waveform.highs ?? [];
			const lines: [string, number[]][] = [
				["#f54242", lows],
				["#42f542", mids],
				["#4242f5", highs]
			];

			ctx.lineWidth = 2;
			for (const [color, path] of lines) {
				ctx.strokeStyle = color;
				ctx.beginPath();

				const actualEnd = Math.min(end, path.length - 1);
				for (let i = start; i <= actualEnd; i++) {
					const x = mapLinear(i / sampleRate, time.start, time.end, area.x, area.x + area.width);
					const y = mapLinear(path[i], 0, 255, area.y + area.height, area.y);

					if (i === start) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				}

				ctx.stroke();
			}

			ctx.strokeStyle = "#FFFFFFAA";
			ctx.beginPath();

			const actualEnd = Math.min(end, lows.length - 1, mids.length - 1, highs.length - 1);
			for (let i = start; i <= actualEnd; i++) {
				const x = mapLinear(i / sampleRate, time.start, time.end, area.x, area.x + area.width);
				const y = mapLinear(lows[i] + mids[i] + highs[i], 0, 255, area.y + area.height, area.y);

				if (i === start) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}

			ctx.stroke();
		}
	},
	{
		name: "Vocals",
		layer: "content",
		height: 0.2,
		isSupported: audio => !!audio.trackData.vocalActivity?.value,
		render: (ctx, audio, time, area) => {
			const vocalActivity = audio.trackData.vocalActivity?.value;
			if (!vocalActivity || !vocalActivity.sourceSampleRateHz || !vocalActivity.samplesBetweenWindows) return;
			const probabilies = vocalActivity.vocalActivityProbabilities ?? [];

			const sampleRate = vocalActivity.sourceSampleRateHz / vocalActivity.samplesBetweenWindows;
			const start = Math.min(Math.max(0, Math.floor(time.start * sampleRate)), probabilies.length - 1);
			const end = Math.min(Math.max(0, Math.floor(time.end * sampleRate)), probabilies.length - 1);

			ctx.beginPath();

			for (let i = start; i <= end; i++) {
				const value = probabilies[i];
				const sampleTime = i / sampleRate;
				const sampleEnd = (i + 1) / sampleRate;

				const xStart = mapLinear(sampleTime, time.start, time.end, area.x, area.x + area.width);
				const xEnd = mapLinear(sampleEnd, time.start, time.end, area.x, area.x + area.width);

				ctx.fillStyle = `rgba(255, 255, 255, ${value / 100})`;
				ctx.fillRect(xStart, area.y, xEnd - xStart, area.height);
			}

			ctx.fill();
		}
	},
	{
		name: "Loudness",
		layer: "content",
		height: 1,
		isSupported: audio => !!audio.trackData.audioAnalysis?.value,
		render: (ctx, audio, time, area) => {
			const analysis = audio.trackData.audioAnalysis?.value;
			if (!analysis) return;

			const start = binarySearchIndex(analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(analysis.segments, b => b.start, time.end);

			const transformLoudness = (l: number) => decibelsToAmplitude(l);

			ctx.lineWidth = 2;
			ctx.strokeStyle = "white";
			ctx.beginPath();

			for (let i = start; i <= end + 1 && i < analysis.segments.length; i++) {
				const segment = analysis.segments[i];

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

				if (i === analysis.segments.length - 1) {
					const xEnd = mapLinear(
						segment.start + segment.duration,
						time.start,
						time.end,
						area.x,
						area.x + area.width
					);
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
		isSupported: audio => !!audio.trackData.audioAnalysis?.value,
		render: (ctx, audio, time, area) => {
			const analysis = audio.trackData.audioAnalysis?.value;
			if (!analysis) return;

			const start = binarySearchIndex(analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(analysis.segments, b => b.start, time.end);

			ctx.beginPath();

			for (let i = start; i <= end; i++) {
				const segment = analysis.segments[i];

				const xStart = mapLinear(segment.start, time.start, time.end, area.x, area.x + area.width);
				const xEnd = mapLinear(
					segment.start + segment.duration,
					time.start,
					time.end,
					area.x,
					area.x + area.width
				);

				ctx.fillStyle = `rgba(255, 255, 255, ${segment.confidence})`;
				ctx.fillRect(xStart, area.y, xEnd - xStart, area.height);
			}

			ctx.fill();
		}
	},
	{
		name: "Timbre",
		layer: "content",
		height: 1,
		isSupported: audio => !!audio.trackData.audioAnalysis?.value,
		render: (ctx, audio, time, area) => {
			const analysis = audio.trackData.audioAnalysis?.value;
			if (!analysis) return;

			const rowHeight = area.height / 12;

			const start = binarySearchIndex(analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(analysis.segments, b => b.start, time.end);

			for (let t = 0; t < 12; t++) {
				const goldenRatio = (Math.sqrt(5) - 1) / 2;
				const hue = t * goldenRatio;

				ctx.beginPath();

				for (let i = start; i <= end; i++) {
					const segment = analysis.segments[i];
					const value = mapLinear(Math.tanh(0.02 * segment.timbre[t]), -1, 1, 0, 1);

					const xStart = mapLinear(segment.start, time.start, time.end, area.x, area.x + area.width);
					const xEnd = mapLinear(
						segment.start + segment.duration,
						time.start,
						time.end,
						area.x,
						area.x + area.width
					);

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
		height: 1,
		isSupported: audio => !!audio.trackData.audioAnalysis?.value,
		render: (ctx, audio, time, area) => {
			const analysis = audio.trackData.audioAnalysis?.value;
			if (!analysis) return;

			const rowHeight = area.height / 12;

			const start = binarySearchIndex(analysis.segments, b => b.start, time.start);
			const end = binarySearchIndex(analysis.segments, b => b.start, time.end);

			for (let p = 0; p < 12; p++) {
				const hue = p / 12;

				ctx.beginPath();

				for (let i = start; i <= end; i++) {
					const segment = analysis.segments[i];

					const xStart = mapLinear(segment.start, time.start, time.end, area.x, area.x + area.width);
					const xEnd = mapLinear(
						segment.start + segment.duration,
						time.start,
						time.end,
						area.x,
						area.x + area.width
					);

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
		isSupported: audio => !!audio.rhythm,
		render: (ctx, audio, time, area) => {
			const rhythm = audio.rhythm;
			if (!rhythm) return;

			const markerHeight = area.height / rhythm.length;
			const markerWidth = Math.min(markerHeight, 20);

			const timePad = (markerWidth / 2 / area.width) * (time.end - time.start);

			ctx.fillStyle = "white";
			ctx.beginPath();

			for (let c = rhythm.length - 1; c >= 0; c--) {
				const start = binarySearchIndex(rhythm[c], r => r, time.start - timePad);
				const end = binarySearchIndex(rhythm[c], r => r, time.end + timePad);

				for (let i = start; i <= end; i++) {
					const x = mapLinear(rhythm[c][i], time.start, time.end, area.x, area.x + area.width);
					const y = area.y + c * markerHeight;

					ctx.rect(x - markerWidth / 2, y, markerWidth, markerHeight);
				}
			}

			ctx.fill();
		}
	}
];

export default function DebugVisualizer(props: RendererProps) {
	const onError = useContext(ErrorHandlerContext);

	const [supportedSections, barDuration, processedTrackData] = useMemo(() => {
		const audioAnalysis = props.trackData.audioAnalysis?.value;
		const beats = props.trackData.beats?.value;

		let rhythm = audioAnalysis && parseRhythmString(audioAnalysis.track.rhythmstring);

		const processedTrackData: ProcessedTrackData = {
			trackData: props.trackData,
			rhythm
		};

		const supportedSections = SECTIONS.filter(s => s.isSupported(processedTrackData));
		const supportedContent = supportedSections.filter(s => s.layer === "content");

		if (supportedContent.length === 0) {
			const error = Object.values(props.trackData).find(e => e.error)?.error ?? "Unknown error";
			onError(error, ErrorRecovery.MANUAL);
		}

		let barDuration = 1;
		if (audioAnalysis)
			barDuration = audioAnalysis.bars.reduce((acc, val) => acc + val.duration, 0) / audioAnalysis.bars.length;
		else if (beats && beats.beats && beats.beats.length > 1) {
			const bars = beats.beats.filter(b => b.value === 1);
			const firstBar = bars[0].time ?? 0;
			const lastBar = bars[bars.length - 1].time ?? 0;

			barDuration = (lastBar - firstBar) / (bars.length - 1);
		}

		if (!Number.isFinite(barDuration) || Math.abs(barDuration) < 1e-8) barDuration = 1;

		return [supportedSections, barDuration, processedTrackData];
	}, [props.trackData]);

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
		if (state.isError || !ctx) return;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		const progress = AudioSyncManager.getProgress();
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

			section.render(ctx, data.processedTrackData, time, area);

			ctx.restore();
		};

		for (const section of data.supportedSections) {
			if (section.layer !== "background") continue;

			renderSection(section, {
				x: SECTION_TITLE_SIZE + SECTION_TITLE_SPACING,
				y: 0,
				width: ctx.canvas.width - SECTION_TITLE_SIZE - SECTION_TITLE_SPACING,
				height: ctx.canvas.height
			});
		}

		const contentSections = data.supportedSections.filter(s => s.layer === "content");

		const contentSpace = ctx.canvas.height - SECTION_SPACING * (contentSections.length - 1);
		const totalHeight = contentSections.reduce((acc, val) => acc + val.height, 0);

		let currentHeight = 0;
		let currentCount = 0;

		for (const section of contentSections) {
			const yStart = mapLinear(currentHeight, 0, totalHeight, 0, contentSpace) + currentCount * SECTION_SPACING;
			const yEnd =
				mapLinear(currentHeight + section.height, 0, totalHeight, 0, contentSpace) +
				currentCount * SECTION_SPACING;

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

		for (const section of data.supportedSections) {
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
			data={{ barDuration, supportedSections, processedTrackData }}
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
