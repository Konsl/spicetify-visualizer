import React, { useCallback, useContext, useMemo } from "react";
import AnimatedCanvas from "../AnimatedCanvas";
import { decibelsToAmplitude, binarySearchIndex, sampleSegmentedFunction, smoothstep, mapLinear } from "../../utils";
import { parseRhythmString } from "../../RhythmString";
import { ErrorHandlerContext, ErrorRecovery } from "../../error";
import { RendererProps } from "../../app";

type CanvasData = {
	themeColor: Spicetify.Color;
	spectrumData: { x: number; y: number }[][];
};

type RendererState =
	| {
			isError: true;
	  }
	| {
			isError: false;
	  };

export default function SpectrumVisualizer(props: RendererProps) {
	const onError = useContext(ErrorHandlerContext);

	const spectrumData = useMemo(() => {
		if (!props.audioAnalysis) return [];

		if (props.audioAnalysis.track.rhythm_version !== 1) {
			onError(
				`Error: Unsupported rhythmstring version ${props.audioAnalysis.track.rhythm_version}`,
				ErrorRecovery.SONG_CHANGE
			);
			return [];
		}

		const segments = props.audioAnalysis.segments;
		const rhythm = parseRhythmString(props.audioAnalysis.track.rhythmstring);

		if (segments.length === 0 || rhythm.length === 0) return [];

		const RHYTHM_WEIGHT = 0.4;
		const RHYTHM_OFFSET = 0.2;
		const FALLOFF_SPEED = 0.4;

		const rhythmWindowSize = (RHYTHM_WEIGHT / Math.sqrt(2)) * 8;

		const channelCount = 12 * rhythm.length;
		const channelSegments: number[][] = [];

		for (let i = 0; i < segments.length; i++) {
			const segment = segments[i];
			const amplitudeStart = decibelsToAmplitude(segment.loudness_start);
			const amplitudeMax = decibelsToAmplitude(segment.loudness_max);
			const peakPosition = segment.start + segment.loudness_max_time;
			const pitches = segment.pitches;

			const rhythmWindowStart = peakPosition - rhythmWindowSize;
			const rhythmWindowEnd = peakPosition + rhythmWindowSize;
			const frequencies = rhythm.map(channel => {
				const start = binarySearchIndex(channel, e => e, rhythmWindowStart);
				const end = binarySearchIndex(channel, e => e, rhythmWindowEnd);

				return (
					channel
						.slice(start, end)
						.map(e => Math.exp(-Math.pow((e - peakPosition) / RHYTHM_WEIGHT, 2)))
						.reduce((a, b) => a + b, 0) + RHYTHM_OFFSET
				);
			});

			const frequenciesMax = Math.max(...frequencies);
			for (let i = 0; i < frequencies.length; i++) frequencies[i] /= frequenciesMax;

			const channels: number[] = Array(channelCount);
			for (let j = 0; j < frequencies.length; j++) {
				const pitchVariation = mapLinear(j, 0, frequencies.length - 1, 0.2, 0.6);

				for (let k = 0; k < 12; k++) {
					const frequency = sampleSegmentedFunction(
						[...frequencies.entries()],
						e => e[0],
						e => e[1],
						smoothstep,
						j + k / 12
					);
					const pitchAvg = pitches.reduce((a, b) => a + b, 0) / pitches.length;
					const pitch = pitches[k] * pitchVariation + pitchAvg * (1 - pitchVariation);
					channels[12 * j + k] = frequency * pitch;
				}
			}

			channelSegments.push([segment.start, ...channels.map(c => c * amplitudeStart)]);
			channelSegments.push([peakPosition, ...channels.map(c => c * amplitudeMax)]);

			if (i == segments.length - 1) {
				const amplitudeEnd = decibelsToAmplitude(segment.loudness_end);
				channelSegments.push([segment.start + segment.duration, ...channels.map(c => c * amplitudeEnd)]);
			}
		}

		const spectrumData: { x: number; y: number }[][] = Array(channelCount)
			.fill(0)
			.map(_ => Array(channelSegments.length));
		for (let i = 0; i < channelCount; i++) {
			let channelIndex = 0;
			let prevSegment = { x: 0, y: 0 };
			let prevPeak = { x: 0, y: 0 };

			for (let j = 0; j < channelSegments.length; j++) {
				const currentSegment = { x: channelSegments[j][0], y: channelSegments[j][i + 1] };
				const currentEnd = currentSegment.x + currentSegment.y / FALLOFF_SPEED;
				const prevPeakEnd = prevPeak.x + prevPeak.y / FALLOFF_SPEED;

				if (currentEnd > prevPeakEnd) {
					if (prevPeak.x !== prevSegment.x) {
						const m1 = (currentSegment.y - prevSegment.y) / (currentSegment.x - prevSegment.x);
						const b1 = prevSegment.y - m1 * prevSegment.x;
						const m2 = -FALLOFF_SPEED;
						const b2 = prevPeak.y - m2 * prevPeak.x;

						const cx = (b2 - b1) / (m1 - m2);
						const cy = m1 * cx + b1;

						spectrumData[i][channelIndex] = { x: cx, y: cy };
						channelIndex++;
					}

					prevPeak = currentSegment;

					spectrumData[i][channelIndex] = currentSegment;
					channelIndex++;
				}

				prevSegment = currentSegment;
			}

			spectrumData[i].length = channelIndex;
		}

		return spectrumData;
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
		if (state.isError || !ctx) return;

		const progress = Spicetify.Player.getProgress() / 1000;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = data.themeColor.toCSS(Spicetify.Color.CSSFormat.HEX);

		const barCount = data.spectrumData.length;
		const barWidth = (ctx.canvas.width / barCount) * 0.7;
		const spaceWidth = (ctx.canvas.width - barWidth * barCount) / (barCount + 1);

		for (let i = 0; i < barCount; i++) {
			// Sample the value for this bar
			let value = sampleSegmentedFunction(
				data.spectrumData[i],
				x => x.x,
				x => x.y,
				x => x,
				progress
			);
			
			// Amplify the value to make bars taller (1.8x taller)
			value = Math.min(value * 1.8, 1.0);
			
			// Calculate bar position and draw it
			const barHeight = value * ctx.canvas.height;
			const barY = ctx.canvas.height - barHeight;
			
			ctx.fillRect(
				spaceWidth * (i + 1) + barWidth * i,
				barY,
				barWidth,
				barHeight
			);
		}
	}, []);

	return (
		<AnimatedCanvas
			isEnabled={props.isEnabled}
			data={{ themeColor: props.themeColor, spectrumData }}
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
