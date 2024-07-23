import React, { useCallback, useMemo } from "react";
import AnimatedCanvas from "../AnimatedCanvas";
import { decibelsToAmplitude, binarySearchIndex } from "../../utils";
import { parseRhythmString, RhythmString } from "../../RhythmString";

type CanvasData = {
	themeColor: Spicetify.Color;
	segments: SpotifyAudioAnalysis.Segment[];
	rhythmString: RhythmString;
};

type RendererState =
	| {
			isError: true;
	  }
	| {
			isError: false;
	  };

export default function SpectrumVisualizer(props: {
	isEnabled: boolean;
	onError: (msg: string) => void;
	themeColor: Spicetify.Color;
	audioAnalysis?: SpotifyAudioAnalysis;
}) {
	const segments = props.audioAnalysis?.segments ?? [];
	const rhythmString = useMemo(() => {
		if (!props.audioAnalysis || props.audioAnalysis.track.rhythm_version !== 1) return [];
		return parseRhythmString(props.audioAnalysis.track.rhythmstring);
	}, [props.audioAnalysis]);

	const onInit = useCallback((ctx: CanvasRenderingContext2D | null): RendererState => {
		if (!ctx) {
			props.onError("Error: 2D rendering is not supported");
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

		const progress = Spicetify.Player.getProgress() / 1000;
		const falloff = 0.7;
        const maxFalloffDistance = 1 / falloff;

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = data.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX);

		const windowSize = 2;
		const windowStart = progress - windowSize / 2;
		const windowEnd = progress + windowSize / 2;
		const windowStartIndex = binarySearchIndex(data.segments, e => e.start, windowStart - maxFalloffDistance);
		const windowEndIndex = binarySearchIndex(data.segments, e => e.start, windowEnd);

		const timeToScreen = (time: number) => ((time - windowStart) / windowSize) * ctx.canvas.width;

		ctx.strokeStyle = "#ffffff7f";
		ctx.lineWidth = 2;
		for (let i = windowStartIndex; i <= windowEndIndex; i++) {
			const segment = data.segments[i];

			ctx.beginPath();
			ctx.moveTo(timeToScreen(segment.start), ctx.canvas.height);
			ctx.lineTo(timeToScreen(segment.start), 0);
			ctx.stroke();
		}

		const rhythmStringScale = 0.1;
		const rhythmStringWindow = rhythmStringScale / Math.sqrt(2) * 4;
		const rhythmStringWindowStart = progress - rhythmStringWindow;
		const rhythmStringWindowEnd = progress + rhythmStringWindow;

		for (let i = 0; i < data.rhythmString.length; i++) {
			const channel = data.rhythmString[i];
			const channelWindowStartIndex = binarySearchIndex(channel, e => e, rhythmStringWindowStart);
			const channelWindowEndIndex = binarySearchIndex(channel, e => e, rhythmStringWindowEnd);

			for (let j = channelWindowStartIndex; j <= channelWindowEndIndex; j++) {
				const position = channel[j];
				const importance = Math.exp(-Math.pow((position - progress) / rhythmStringScale, 2));
				const centerX = timeToScreen(position);
				const centerY = ctx.canvas.height * (1 - (i + 0.5) / data.rhythmString.length);

				ctx.fillStyle = data.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX) + Math.round(importance * 255).toString(16).padStart(2, "0");
				ctx.fillRect(centerX - 4, centerY - 4, 8, 8);
			}
		}

		for (let x = rhythmStringWindowStart; x <= rhythmStringWindowEnd; x += 0.01) {
			const importance = Math.exp(-Math.pow((x - progress) / rhythmStringScale, 2));
			const centerX = timeToScreen(x);

			ctx.fillStyle = data.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX) + Math.round(importance * 255).toString(16).padStart(2, "0");
			ctx.fillRect(centerX - 4, ctx.canvas.height - 8, 8, 8);
		}

		ctx.strokeStyle = data.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX) + "7f";
		ctx.lineWidth = 2;
		for (let i = windowStartIndex; i <= windowEndIndex; i++) {
			const segment = data.segments[i];
			const isLast = i + 1 >= data.segments.length;

			const points = [
				[segment.start, decibelsToAmplitude(segment.loudness_start)],
				[segment.start + segment.loudness_max_time, decibelsToAmplitude(segment.loudness_max)]
			];
			if (isLast) points.push([segment.start + segment.duration, decibelsToAmplitude(segment.loudness_end)]);

			ctx.beginPath();

			for (let j = 0; j < points.length; j++) {
				const falloffEnd = points[j][0] + points[j][1] / falloff;

				ctx.moveTo(timeToScreen(points[j][0]), ctx.canvas.height * 0.5 * (1 - points[j][1]));
				ctx.lineTo(timeToScreen(falloffEnd), ctx.canvas.height * 0.5);
				ctx.lineTo(timeToScreen(points[j][0]), ctx.canvas.height * 0.5 * (1 + points[j][1]));
			}

			ctx.stroke();
		}

		ctx.strokeStyle = data.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX);
		ctx.lineWidth = 2;
		for (let i = windowStartIndex; i <= windowEndIndex; i++) {
			const segment = data.segments[i];
			const nextSegment = data.segments.length > i + 1 ? data.segments[i + 1] : null;

			const amplitudeStart = decibelsToAmplitude(segment.loudness_start);
			const amplitudeMax = decibelsToAmplitude(segment.loudness_max);
			const amplitudeEnd = decibelsToAmplitude(nextSegment?.loudness_start ?? segment.loudness_end);

			ctx.beginPath();
			ctx.moveTo(timeToScreen(segment.start), ctx.canvas.height * 0.5 * (1 - amplitudeStart));
			ctx.lineTo(timeToScreen(segment.start + segment.loudness_max_time), ctx.canvas.height * 0.5 * (1 - amplitudeMax));
			ctx.lineTo(timeToScreen(segment.start + segment.duration), ctx.canvas.height * 0.5 * (1 - amplitudeEnd));
			ctx.moveTo(timeToScreen(segment.start), ctx.canvas.height * 0.5 * (1 + amplitudeStart));
			ctx.lineTo(timeToScreen(segment.start + segment.loudness_max_time), ctx.canvas.height * 0.5 * (1 + amplitudeMax));
			ctx.lineTo(timeToScreen(segment.start + segment.duration), ctx.canvas.height * 0.5 * (1 + amplitudeEnd));
			ctx.stroke();
		}

		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(timeToScreen(progress), ctx.canvas.height);
		ctx.lineTo(timeToScreen(progress), 0);
		ctx.stroke();

		/* const barCount = 96;
		const barWidth = (ctx.canvas.width / barCount) * 0.7;
		const spaceWidth = (ctx.canvas.width - barWidth * barCount) / (barCount + 1);

		for (let i = 0; i < barCount; i++) {
			const value = Math.random();

			ctx.fillRect(spaceWidth * (i + 1) + barWidth * i, ctx.canvas.height - value * ctx.canvas.height, barWidth, value * ctx.canvas.height);
		} */
	}, []);

	return (
		<AnimatedCanvas
			isEnabled={props.isEnabled}
			data={{ themeColor: props.themeColor, segments, rhythmString }}
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
