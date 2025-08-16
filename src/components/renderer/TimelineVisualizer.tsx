import React, { useCallback, useContext, useMemo } from "react";
import AnimatedCanvas from "../AnimatedCanvas";
import {
    sampleAmplitudeMovingAverage,
    decibelsToAmplitude,
    mapLinear
} from "../../utils";
import { ErrorHandlerContext } from "../../error";
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
        time: number;
        barVisuals: BarVisual[];
        beatVisuals: BeatVisual[];
        sectionVisuals: SectionVisual[];
        pitchHistory: number[][];
        activeSection: number;
        activeSectionStartTime: number;
        activeSectionProgress: number;
      };

interface BarVisual {
    start: number;
    duration: number;
    confidence: number;
    active: boolean;
    color: string;
}

interface BeatVisual {
    start: number;
    duration: number;
    confidence: number;
    active: boolean;
    pulse: number;
}

interface SectionVisual {
    start: number;
    duration: number;
    tempo: number;
    loudness: number;
    key: number;
    mode: number;
    color: string;
    active: boolean;
}

export default function TimelineVisualizer(props: RendererProps) {
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

        return amplitudeCurve;
    }, [props.audioAnalysis]);

    // Create a palette of colors from the theme color
    const createColorPalette = useCallback((baseColor: Spicetify.Color) => {
        const [h, s, l] = rgbToHsl(baseColor.rgb.r, baseColor.rgb.g, baseColor.rgb.b);
        
        // Create variations for different elements
        return {
            primary: `hsla(${h * 360}, ${Math.min(100, s * 100 + 20)}%, ${Math.min(100, l * 100 + 10)}%, 0.8)`,
            secondary: `hsla(${((h + 0.05) % 1) * 360}, ${Math.min(100, s * 100 + 10)}%, ${Math.min(100, l * 100 + 5)}%, 0.6)`,
            accent: `hsla(${((h + 0.5) % 1) * 360}, ${Math.min(100, s * 100 + 20)}%, ${Math.min(100, l * 100 + 10)}%, 0.7)`,
            background: `hsla(${h * 360}, ${Math.min(100, s * 100 - 10)}%, ${Math.min(100, l * 100 - 10)}%, 0.9)`,
            timeline: `hsla(${h * 360}, ${Math.min(100, s * 100 + 10)}%, ${Math.min(100, l * 100 + 20)}%, 0.6)`,
            barColors: Array(12).fill(0).map((_, i) => 
                `hsla(${((h + i / 12) % 1) * 360}, ${Math.min(100, s * 100 + 10)}%, ${Math.min(100, l * 100 + 10)}%, 0.8)`
            )
        };
    }, []);

    // Utility function to generate colors for sections based on their musical key
    const getSectionColor = useCallback((section: Spicetify.AudioAnalysis.Section, palette: any) => {
        // Use the musical key to select a color (in the circle of fifths)
        const keyIndex = section.key >= 0 ? section.key : 0;
        const colorIndex = keyIndex % palette.barColors.length;
        // Adjust opacity based on confidence
        const opacity = 0.3 + section.key_confidence * 0.7;
        const baseColor = palette.barColors[colorIndex];
        return baseColor.replace(/[\d.]+\)$/, `${opacity})`);
    }, []);

    const seed = props.audioAnalysis?.meta.timestamp ?? 0;

    const onInit = useCallback((ctx: CanvasRenderingContext2D | null): RendererState => {
        if (!ctx) return { isError: true };
        
        const barVisuals: BarVisual[] = [];
        const beatVisuals: BeatVisual[] = [];
        const sectionVisuals: SectionVisual[] = [];
        const pitchHistory: number[][] = [];
        
        if (props.audioAnalysis) {
            const palette = createColorPalette(props.themeColor);
            
            // Initialize bars
            props.audioAnalysis.bars.forEach(bar => {
                barVisuals.push({
                    start: bar.start,
                    duration: bar.duration,
                    confidence: bar.confidence,
                    active: false,
                    color: palette.secondary
                });
            });
            
            // Initialize beats
            props.audioAnalysis.beats.forEach(beat => {
                beatVisuals.push({
                    start: beat.start,
                    duration: beat.duration,
                    confidence: beat.confidence,
                    active: false,
                    pulse: 0
                });
            });
            
            // Initialize sections
            props.audioAnalysis.sections.forEach(section => {
                sectionVisuals.push({
                    start: section.start,
                    duration: section.duration,
                    tempo: section.tempo,
                    loudness: section.loudness,
                    key: section.key,
                    mode: section.mode,
                    color: getSectionColor(section, palette),
                    active: false
                });
            });
            
            // Initialize pitch history with empty arrays
            for (let i = 0; i < 50; i++) {
                pitchHistory.push(Array(12).fill(0));
            }
        }

        return {
            isError: false,
            time: 0,
            barVisuals,
            beatVisuals,
            sectionVisuals,
            pitchHistory,
            activeSection: 0,
            activeSectionStartTime: 0,
            activeSectionProgress: 0
        };
    }, [props.audioAnalysis, props.themeColor, createColorPalette, getSectionColor]);

    const onResize = useCallback((ctx: CanvasRenderingContext2D | null, state: RendererState) => {
        // Resize logic if needed
    }, []);

    const onRender = useCallback((ctx: CanvasRenderingContext2D | null, data: CanvasData, state: RendererState) => {
        if (state.isError || !ctx) return;

        const progress = Spicetify.Player.getProgress() / 1000;
        const songPosition = progress;
        const newTime = state.time + 0.016;
        const colors = createColorPalette(data.themeColor);
        
        // Clear canvas with transparent background
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        if (!props.audioAnalysis) return;
        
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        
        const totalDuration = props.audioAnalysis.track.duration;
        
        // Find current segment, section, bar and beat
        const currentSegmentIndex = props.audioAnalysis.segments.findIndex(
            (segment, i, segments) => {
                const nextSegment = segments[i + 1];
                return segment.start <= songPosition && 
                      (!nextSegment || nextSegment.start > songPosition);
            }
        );
        
        const currentSectionIndex = props.audioAnalysis.sections.findIndex(
            (section, i, sections) => {
                const nextSection = sections[i + 1];
                return section.start <= songPosition && 
                      (!nextSection || nextSection.start > songPosition);
            }
        );
        
        const currentSection = props.audioAnalysis.sections[currentSectionIndex];
        
        // Check if we've changed sections
        if (currentSectionIndex !== state.activeSection) {
            state.activeSection = currentSectionIndex;
            state.activeSectionStartTime = currentSection.start;
        }
        
        // Calculate section progress
        state.activeSectionProgress = (songPosition - state.activeSectionStartTime) / currentSection.duration;
        
        // Update active states for bars, beats, and sections
        state.barVisuals.forEach((barVisual, i) => {
            const nextBar = state.barVisuals[i + 1];
            barVisual.active = barVisual.start <= songPosition && 
                             (!nextBar || nextBar.start > songPosition);
        });
        
        state.beatVisuals.forEach((beatVisual, i) => {
            const nextBeat = state.beatVisuals[i + 1];
            const wasActive = beatVisual.active;
            beatVisual.active = beatVisual.start <= songPosition && 
                             (!nextBeat || nextBeat.start > songPosition);
            
            // Reset pulse when a new beat becomes active
            if (!wasActive && beatVisual.active) {
                beatVisual.pulse = 1.0;
            } else if (beatVisual.active) {
                // Decrease pulse over time
                beatVisual.pulse = Math.max(0, beatVisual.pulse - 0.05);
            } else {
                beatVisual.pulse = 0;
            }
        });
        
        state.sectionVisuals.forEach((sectionVisual, i) => {
            const nextSection = state.sectionVisuals[i + 1];
            sectionVisual.active = sectionVisual.start <= songPosition && 
                                 (!nextSection || nextSection.start > songPosition);
        });
        
        // Update pitch history if we have a current segment
        if (currentSegmentIndex >= 0) {
            const currentSegment = props.audioAnalysis.segments[currentSegmentIndex];
            // Shift pitch history
            state.pitchHistory.shift();
            // Add new pitch data
            state.pitchHistory.push([...currentSegment.pitches]);
        }
        
        // Draw timeline background
        const timelineHeight = 60;
        const timelineY = canvasHeight - timelineHeight - 20;
        
        ctx.fillStyle = "rgba(20, 20, 30, 0.7)";
        ctx.fillRect(10, timelineY, canvasWidth - 20, timelineHeight);
        
        // Draw sections on timeline
        state.sectionVisuals.forEach(section => {
            const x = 10 + (section.start / totalDuration) * (canvasWidth - 20);
            const width = (section.duration / totalDuration) * (canvasWidth - 20);
            
            // Draw section background
            ctx.fillStyle = section.color;
            ctx.fillRect(x, timelineY, width, timelineHeight);
            
            // Draw section border if active
            if (section.active) {
                ctx.strokeStyle = colors.primary;
                ctx.lineWidth = 2;
                ctx.strokeRect(x, timelineY, width, timelineHeight);
            }
        });
        
        // Draw current position on timeline
        const positionX = 10 + (songPosition / totalDuration) * (canvasWidth - 20);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(positionX - 2, timelineY - 5, 4, timelineHeight + 10);
        
        // Draw pitch visualization based on history
        const pitchHeight = timelineY - 40;
        const pitchWidth = canvasWidth - 40;
        const cellWidth = pitchWidth / state.pitchHistory.length;
        const pitchCellHeight = pitchHeight / 12;
        
        // Draw pitch cells
        state.pitchHistory.forEach((pitchArray, timeIndex) => {
            pitchArray.forEach((pitch, pitchIndex) => {
                const x = 20 + timeIndex * cellWidth;
                const y = 20 + (11 - pitchIndex) * pitchCellHeight;
                
                // Invert pitchIndex so C is at the bottom
                const colorIndex = (11 - pitchIndex) % colors.barColors.length;
                ctx.fillStyle = colors.barColors[colorIndex].replace(/[\d.]+\)$/, `${pitch * 0.8})`);
                
                ctx.fillRect(x, y, cellWidth, pitchCellHeight);
            });
        });
        
        // Draw beat pulses
        const activeBeat = state.beatVisuals.find(beat => beat.active);
        if (activeBeat && activeBeat.pulse > 0) {
            const centerX = canvasWidth / 2;
            const centerY = (pitchHeight + 20 + timelineY) / 2;
            const maxRadius = Math.min(centerX, centerY) * 0.6;
            const radius = activeBeat.pulse * maxRadius;
            
            // Draw pulse circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.accent.replace(/[\d.]+\)$/, `${(1 - activeBeat.pulse) * 0.3})`);
            ctx.fill();
            
            // Draw outer ring
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = colors.accent.replace(/[\d.]+\)$/, `${(1 - activeBeat.pulse) * 0.8})`);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        // Draw current bar indicator
        const activeBar = state.barVisuals.find(bar => bar.active);
        if (activeBar) {
            const barProgress = (songPosition - activeBar.start) / activeBar.duration;
            const barHeight = 20;
            const barY = timelineY - barHeight - 10;
            
            // Draw bar background
            ctx.fillStyle = "rgba(40, 40, 60, 0.6)";
            ctx.fillRect(10, barY, canvasWidth - 20, barHeight);
            
            // Draw bar progress
            ctx.fillStyle = colors.primary;
            ctx.fillRect(10, barY, (canvasWidth - 20) * barProgress, barHeight);
            
            // Draw confidence indicator
            const confidenceWidth = 5;
            ctx.fillStyle = `rgba(255, 255, 255, ${activeBar.confidence})`;
            ctx.fillRect(
                10 + (canvasWidth - 20) * barProgress - confidenceWidth / 2, 
                barY - 5, 
                confidenceWidth, 
                barHeight + 10
            );
        }
        
        // Draw current section info
        if (currentSection) {
            const textY = timelineY + timelineHeight + 15;
            ctx.font = "14px Arial";
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            
            // Get key name
            const keyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
            const keyName = currentSection.key >= 0 ? keyNames[currentSection.key] : "Unknown";
            const modeName = currentSection.mode === 1 ? "Major" : "Minor";
            
            // Format tempo
            const tempo = Math.round(currentSection.tempo);
            
            ctx.fillText(
                `Section ${currentSectionIndex + 1}/${state.sectionVisuals.length} | Key: ${keyName} ${modeName} | Tempo: ${tempo} BPM`, 
                20, 
                textY
            );
        }
        
        // Update state
        state.time = newTime;
    }, [props.audioAnalysis, createColorPalette]);

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

// Utility function to convert RGB to HSL
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    
    if (diff !== 0) {
        s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
        
        if (max === r) h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / diff + 2) / 6;
        else h = ((r - g) / diff + 4) / 6;
    }
    
    return [h, s, l];
}

// Interface for curve entries
interface CurveEntry {
    x: number;
    y: number;
    accumulatedIntegral?: number;
}