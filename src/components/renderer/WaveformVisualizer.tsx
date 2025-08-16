import React, { useCallback, useContext, useMemo } from "react";
import AnimatedCanvas from "../AnimatedCanvas";
import {
	sampleAmplitudeMovingAverage,
	decibelsToAmplitude,
	mapLinear,
	integrateLinearSegment,
	sampleAccumulatedIntegral
} from "../../utils";
import { ErrorHandlerContext, ErrorRecovery } from "../../error";
import { RendererProps } from "../../app";

type CanvasData = {
	themeColor: Spicetify.Color;
	seed: number;
	amplitudeCurve: CurveEntry[];
};

type RendererState =
	| {
			isError: true;
	  }
	| {
			isError: false;
			wavePoints: WavePoint[];
			bars: Bar[];
			time: number;
			energy: number;
			rotationSpeed: number;
	  };

interface WavePoint {
	angle: number;
	radius: number;
	baseRadius: number;
	frequency: number;
	amplitude: number;
	phase: number;
}

interface Bar {
	angle: number;
	value: number;
	targetValue: number;
	color: string;
	width: number;
}

export default function WaveformVisualizer(props: RendererProps) {
	const onError = useContext(ErrorHandlerContext);

	const amplitudeCurve = useMemo(() => {
		if (!props.audioAnalysis) return [{ x: 0, y: 0 }];

		const segments = props.audioAnalysis.segments;
		const amplitudeCurve: CurveEntry[] = segments.flatMap(segment =>
			segment.loudness_max_time
				? [
						{ x: segment.start, y: decibelsToAmplitude(segment.loudness_start) },
						{ x: segment.start + segment.loudness_max_time, y: decibelsToAmplitude(segment.loudness_max) }
				  ]
				: [{ x: segment.start, y: decibelsToAmplitude(segment.loudness_start) }]
		);

		// Add the accumulated integral for smooth animations
		if (segments.length) {
			amplitudeCurve[0].accumulatedIntegral = 0;
			for (let i = 1; i < amplitudeCurve.length; i++) {
				const prev = amplitudeCurve[i - 1];
				const curr = amplitudeCurve[i];
				curr.accumulatedIntegral = (prev.accumulatedIntegral ?? 0) + integrateLinearSegment(prev, curr);
			}

			const lastSegment = segments[segments.length - 1];
			amplitudeCurve.push({
				x: lastSegment.start + lastSegment.duration,
				y: decibelsToAmplitude(lastSegment.loudness_end)
			});
		}

		return amplitudeCurve;
	}, [props.audioAnalysis]);

	// Create a palette of colors from the theme color
	const createColorPalette = useCallback((baseColor: Spicetify.Color) => {
		const [h, s, v] = rgbToHsv(baseColor.rgb.r, baseColor.rgb.g, baseColor.rgb.b);
		
		// Create a few variations for different elements
		return {
			primary: `hsla(${h * 360}, ${Math.min(100, s * 100 + 20)}%, ${Math.min(100, v * 100 + 10)}%, 0.8)`,
			secondary: `hsla(${((h + 0.05) % 1) * 360}, ${Math.min(100, s * 100 + 10)}%, ${Math.min(100, v * 100 + 5)}%, 0.6)`,
			accent: `hsla(${((h + 0.5) % 1) * 360}, ${Math.min(100, s * 100 + 20)}%, ${Math.min(100, v * 100 + 10)}%, 0.7)`,
			glow: `hsla(${h * 360}, ${Math.min(100, s * 100 + 20)}%, ${Math.min(100, v * 100 + 20)}%, 0.5)`,
			barColors: [
				`hsla(${((h + 0.05) % 1) * 360}, ${Math.min(100, s * 100 + 20)}%, ${Math.min(100, v * 100 + 20)}%, 0.8)`,
				`hsla(${((h + 0.1) % 1) * 360}, ${Math.min(100, s * 100 + 15)}%, ${Math.min(100, v * 100 + 15)}%, 0.8)`,
				`hsla(${((h + 0.2) % 1) * 360}, ${Math.min(100, s * 100 + 10)}%, ${Math.min(100, v * 100 + 10)}%, 0.8)`,
				`hsla(${((h + 0.3) % 1) * 360}, ${Math.min(100, s * 100 + 5)}%, ${Math.min(100, v * 100 + 5)}%, 0.8)`,
				`hsla(${((h + 0.4) % 1) * 360}, ${Math.min(100, s * 100)}%, ${Math.min(100, v * 100)}%, 0.8)`
			]
		};
	}, []);

	const seed = props.audioAnalysis?.meta.timestamp ?? 0;

	const onInit = useCallback((ctx: CanvasRenderingContext2D | null): RendererState => {
		if (!ctx) return { isError: true };

		const wavePoints: WavePoint[] = [];
		const numWavePoints = 200;
		const baseRadius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.3;

		// Create wave points in a circle
		for (let i = 0; i < numWavePoints; i++) {
			const angle = (i / numWavePoints) * Math.PI * 2;
			wavePoints.push({
				angle,
				radius: baseRadius,
				baseRadius: baseRadius,
				frequency: 0.05 + Math.random() * 0.05,
				amplitude: 20 + Math.random() * 10,
				phase: Math.random() * Math.PI * 2
			});
		}

		// Create bars for the spectrum visualization
		const bars: Bar[] = [];
		const numBars = 72; // A nice number divisible by 2, 3, 4, etc.
		const colorPalette = createColorPalette(props.themeColor);

		for (let i = 0; i < numBars; i++) {
			const angle = (i / numBars) * Math.PI * 2;
			bars.push({
				angle,
				value: 0,
				targetValue: 0,
				color: colorPalette.barColors[Math.floor((i / numBars) * colorPalette.barColors.length)],
				width: Math.PI * 2 / numBars * 0.8  // 80% of the available space to leave gaps
			});
		}

		return {
			isError: false,
			wavePoints,
			bars,
			time: 0,
			energy: 0,
			rotationSpeed: 0.003
		};
	}, [props.themeColor, createColorPalette]);

	const onResize = useCallback((ctx: CanvasRenderingContext2D | null, state: RendererState) => {
		if (state.isError || !ctx) return;

		const baseRadius = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.3;
		
		// Update base radius for all wave points
		state.wavePoints.forEach(point => {
			point.baseRadius = baseRadius;
		});
	}, []);

	const onRender = useCallback((ctx: CanvasRenderingContext2D | null, data: CanvasData, state: RendererState) => {
		if (state.isError || !ctx) return;

		const progress = Spicetify.Player.getProgress() / 1000;
		const amplitude = sampleAmplitudeMovingAverage(data.amplitudeCurve, progress, 0.15);
		const newTime = state.time + 0.016;
		
		// Boost amplitude sensitivity for better visual response
		const boostedAmplitude = Math.min(1, amplitude * 2.5 + 0.15);
		
		// Update energy based on boosted amplitude (with smoothing)
		const newEnergy = boostedAmplitude; // Directly use boosted amplitude for better response
		
		// Update rotation speed based on energy
		const targetRotationSpeed = 0.003 + newEnergy * 0.02;
		const newRotationSpeed = state.rotationSpeed + (targetRotationSpeed - state.rotationSpeed) * 0.1;
		
		const centerX = ctx.canvas.width / 2;
		const centerY = ctx.canvas.height / 2;
		const colors = createColorPalette(data.themeColor);
		
		// Clear canvas with gradient background
		const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(centerX, centerY));
		bgGradient.addColorStop(0, "rgba(0, 5, 20, 1)");
		bgGradient.addColorStop(1, "rgba(0, 0, 10, 1)");
		ctx.fillStyle = bgGradient;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Draw a center glow based on amplitude
		if (newEnergy > 0.2) {
			const glowRadius = 100 + newEnergy * 100;
			const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
			glowGradient.addColorStop(0, colors.glow);
			glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
			ctx.fillStyle = glowGradient;
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
		
		// Update and draw bars (spectrum analyzer style) with stronger audio response
		for (let i = 0; i < state.bars.length; i++) {
			const bar = state.bars[i];
			
			// Generate values more directly tied to the audio amplitude
			const seed = (i / state.bars.length) * 10 + newTime * 2;
			const noise = Math.sin(seed) * 0.5 + Math.sin(seed * 0.7) * 0.3 + Math.sin(seed * 1.7) * 0.2;
			
			// Make bars much more responsive to audio
			bar.targetValue = (0.2 + noise * 0.2 + amplitude * 1.2) * Math.min(ctx.canvas.width, ctx.canvas.height) * 0.3;
			
			// Faster transition for more immediate response
			bar.value += (bar.targetValue - bar.value) * 0.2;
			
			// Calculate rotation based on time
			const rotatedAngle = bar.angle + newTime * newRotationSpeed;
			
			// Draw bar
			ctx.save();
			ctx.translate(centerX, centerY);
			ctx.rotate(rotatedAngle);
			
			const barWidth = bar.width;
			const innerRadius = state.wavePoints[0].baseRadius * 1.2; // Outside the waveform
			const outerRadius = innerRadius + bar.value;
			
			// Draw bar as a circular sector
			ctx.beginPath();
			ctx.arc(0, 0, outerRadius, -barWidth/2, barWidth/2);
			ctx.arc(0, 0, innerRadius, barWidth/2, -barWidth/2, true);
			ctx.closePath();
			
			// Fill with gradient
			const barGradient = ctx.createLinearGradient(0, 0, outerRadius, 0);
			barGradient.addColorStop(0, colors.accent);
			barGradient.addColorStop(1, bar.color);
			ctx.fillStyle = barGradient;
			ctx.fill();
			
			ctx.restore();
		}
		
		// Update wave points with more pronounced audio response
		if (state.wavePoints && state.wavePoints.length > 0) {
			state.wavePoints.forEach((wavePoint, index) => {
				// Calculate dynamic radius based on time, amplitude and angle
				const timeOffset = newTime * wavePoint.frequency;
				const waveFactor = Math.sin(timeOffset + wavePoint.phase + wavePoint.angle * 3);
				const energyEffect = waveFactor * wavePoint.amplitude * (1 + newEnergy * 6); // Amplify effect
				wavePoint.radius = wavePoint.baseRadius + energyEffect;
			});
		}
		
		// Draw simple circular waveform (base circle)
		ctx.save();
		ctx.translate(centerX, centerY);
		
		// Calculate average radius for a smooth circle that responds to audio
		let avgRadius = 0;
		if (state.wavePoints && state.wavePoints.length > 0) {
			avgRadius = state.wavePoints.reduce((sum, point) => sum + point.radius, 0) / state.wavePoints.length;
		}
		
		// Draw the base circle
		ctx.beginPath();
		ctx.arc(0, 0, avgRadius, 0, Math.PI * 2);
		
		// Create gradient fill
		const gradient = ctx.createRadialGradient(0, 0, avgRadius * 0.3, 0, 0, avgRadius * 1.2);
		gradient.addColorStop(0, colors.secondary);
		gradient.addColorStop(1, colors.primary);
		
		// Apply styles and draw
		ctx.fillStyle = gradient;
		ctx.globalAlpha = 0.7;
		ctx.fill();
		
		// Draw glow outline
		ctx.shadowBlur = 15 + newEnergy * 20;
		ctx.shadowColor = colors.glow;
		ctx.strokeStyle = colors.accent;
		ctx.lineWidth = 2 + newEnergy * 3;
		ctx.stroke();
		
		ctx.globalAlpha = 1;
		ctx.shadowBlur = 0;
		ctx.restore();
		
		// Update state
		state.time = newTime;
		state.energy = newEnergy;
		state.rotationSpeed = newRotationSpeed;
	}, [createColorPalette]);

	return (
		<AnimatedCanvas
			isEnabled={props.isEnabled}
			data={{ themeColor: props.themeColor, seed, amplitudeCurve }}
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

// Utility function to convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;
	
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const diff = max - min;
	
	let h = 0;
	if (diff !== 0) {
		if (max === r) h = ((g - b) / diff) % 6;
		else if (max === g) h = (b - r) / diff + 2;
		else h = (r - g) / diff + 4;
	}
	h = h * 60;
	if (h < 0) h += 360;
	
	const s = max === 0 ? 0 : diff / max;
	const v = max;
	
	return [h / 360, s, v];
}
