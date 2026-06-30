import { MetadataService } from "spicetify-utils";
import DebugVisualizer from "./components/renderer/DebugVisualizer";
import NCSVisualizer from "./components/renderer/NCSVisualizer";
import SpectrumVisualizer from "./components/renderer/SpectrumVisualizer";
import {
	loadAudioAnalysis,
	loadAudioAttributes,
	loadBeats,
	loadExtractedColor,
	loadThreebandWaveform,
	loadVocalActivity
} from "./loaders";

export type Result<T> = { value: T; error?: undefined } | { value?: undefined; error: string };
export type LoaderDefinition<T> = (item: Spicetify.PlayerTrack, metadataService: MetadataService) => Promise<Result<T>>;

export const LOADERS = {
	audioAnalysis: loadAudioAnalysis,
	extractedColor: loadExtractedColor,

	audioAttributes: loadAudioAttributes,
	beats: loadBeats,
	vocalActivity: loadVocalActivity,
	threebandWaveforms: loadThreebandWaveform
}; // satisfies Record<string, LoaderDefinition<any>>;
export type LoaderID = keyof typeof LOADERS;

export type LoaderValue<T extends LoaderID> = (typeof LOADERS)[T] extends LoaderDefinition<infer U> ? U : never;
export type TrackData = { [ID in LoaderID]?: Result<LoaderValue<ID>> };

export type RendererProps = {
	isEnabled: boolean;
	trackData: TrackData;
};

export type RendererDefinition = {
	name: string;
	requiredAudioData: LoaderID[];
	renderer: React.FunctionComponent<RendererProps>;
};

export const RENDERERS: Record<string, RendererDefinition> = {
	ncs: {
		name: "NCS",
		requiredAudioData: ["audioAnalysis", "extractedColor"],
		renderer: NCSVisualizer
	},
	spectrum: {
		name: "Spectrum (very WIP)",
		requiredAudioData: ["audioAnalysis", "extractedColor"],
		renderer: SpectrumVisualizer
	},
	debug: {
		name: "DEBUG",
		requiredAudioData: ["audioAnalysis", "beats", "threebandWaveforms", "vocalActivity"],
		renderer: DebugVisualizer
	}
};

export const DEFAULT_COLOR = "#535353";
