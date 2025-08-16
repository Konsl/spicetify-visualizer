import React from 'react';
import NCSVisualizer from './NCSVisualizer';
import SpectrumVisualizer from './SpectrumVisualizer';
import DebugVisualizer from './DebugVisualizer';
import TimelineVisualizer from './TimelineVisualizer';

interface CombinedVisualizerProps {
	themeColor: {
		rgb: { r: number; g: number; b: number };
	};
	audioAnalysis: Spicetify.AudioAnalysis | null;
	isEnabled: boolean;
}

export default function CombinedVisualizer(props: CombinedVisualizerProps) {
	return (
		<div style={{
			width: '100%',
			height: '100%',
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gridTemplateRows: '1fr 1fr 1fr',
			gap: '1px',
			background: 'transparent'
		}}>
			{/* Top Left: NCS Visualizer */}
			<div style={{ position: 'relative', overflow: 'hidden', gridColumn: '1', gridRow: '1' }}>
				<NCSVisualizer
					themeColor={props.themeColor}
					audioAnalysis={props.audioAnalysis}
					isEnabled={props.isEnabled}
				/>
				<div style={{
					position: 'absolute',
					top: '8px',
					left: '8px',
					color: 'rgba(255,255,255,0.7)',
					fontSize: '12px',
					fontWeight: 'bold',
					textShadow: '0 0 4px rgba(0,0,0,0.8)',
					pointerEvents: 'none'
				}}>
					NCS
				</div>
			</div>

			{/* Top Right: Spectrum Visualizer */}
			<div style={{ position: 'relative', overflow: 'hidden', gridColumn: '2', gridRow: '1' }}>
				<SpectrumVisualizer
					themeColor={props.themeColor}
					audioAnalysis={props.audioAnalysis}
					isEnabled={props.isEnabled}
				/>
				<div style={{
					position: 'absolute',
					top: '8px',
					left: '8px',
					color: 'rgba(255,255,255,0.7)',
					fontSize: '12px',
					fontWeight: 'bold',
					textShadow: '0 0 4px rgba(0,0,0,0.8)',
					pointerEvents: 'none'
				}}>
					Spectrum
				</div>
			</div>

			{/* Middle Left: Debug Visualizer */}
			<div style={{ position: 'relative', overflow: 'hidden', gridColumn: '1', gridRow: '2' }}>
				<DebugVisualizer
					themeColor={props.themeColor}
					audioAnalysis={props.audioAnalysis}
					isEnabled={props.isEnabled}
				/>
				<div style={{
					position: 'absolute',
					top: '8px',
					left: '8px',
					color: 'rgba(255,255,255,0.7)',
					fontSize: '12px',
					fontWeight: 'bold',
					textShadow: '0 0 4px rgba(0,0,0,0.8)',
					pointerEvents: 'none'
				}}>
					Debug
				</div>
			</div>

			{/* Bottom Row: Timeline Visualizer */}
			<div style={{ position: 'relative', overflow: 'hidden', gridColumn: '1 / span 2', gridRow: '3' }}>
				<TimelineVisualizer
					themeColor={props.themeColor}
					audioAnalysis={props.audioAnalysis}
					isEnabled={props.isEnabled}
				/>
				<div style={{
					position: 'absolute',
					top: '8px',
					left: '8px',
					color: 'rgba(255,255,255,0.7)',
					fontSize: '12px',
					fontWeight: 'bold',
					textShadow: '0 0 4px rgba(0,0,0,0.8)',
					pointerEvents: 'none'
				}}>
					Timeline
				</div>
			</div>

			{/* Audio Info Display */}
			<div style={{
				position: 'relative',
				background: 'linear-gradient(135deg, rgba(20,20,30,0.5), rgba(40,20,60,0.5))',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '20px',
				color: 'white',
				gridColumn: '2',
				gridRow: '2'
			}}>
				<div style={{
					fontSize: '14px',
					fontWeight: 'bold',
					marginBottom: '10px',
					textAlign: 'center'
				}}>
					Audio Info
				</div>
				<div style={{ fontSize: '11px', lineHeight: '1.4', textAlign: 'center' }}>
					{props.audioAnalysis ? (
						<>
							<div>Segments: {props.audioAnalysis.segments?.length || 0}</div>
							<div>Bars: {props.audioAnalysis.bars?.length || 0}</div>
							<div>Beats: {props.audioAnalysis.beats?.length || 0}</div>
							<div>Tatums: {props.audioAnalysis.tatums?.length || 0}</div>
							<div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>
								Track Analysis Active
							</div>
						</>
					) : (
						<div style={{ opacity: 0.5 }}>No audio analysis available</div>
					)}
				</div>
			</div>
		</div>
	);
}
