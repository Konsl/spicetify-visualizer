import {
	AudioAttributesV2,
	Beats,
	CacheStatus,
	ColorResult,
	ExtensionKind,
	MetadataService,
	parseProtobuf,
	PBValue,
	PBValueTypeOf,
	ThreebandWaveforms,
	VocalActivity
} from "spicetify-utils";
import { DEFAULT_COLOR, Result } from "./defs";

async function loadMetadata<T>(
	metadataService: MetadataService,
	extensionKind: ExtensionKind,
	typeUrl: string,
	parser: PBValue<T>,
	entityUri: string
): Promise<{ value: T } | { error: CacheStatus }> {
	try {
		const responseData = await metadataService.fetch(extensionKind, entityUri);
		if (!responseData || responseData.value.length === 0 || responseData.typeUrl !== typeUrl)
			return { error: CacheStatus.UNKNOWN };

		return { value: parseProtobuf(responseData.value, parser) };
	} catch (e) {
		return { error: e as CacheStatus };
	}
}

export async function loadAudioAnalysis(item: Spicetify.PlayerTrack): Promise<Result<SpotifyAudioAnalysis>> {
	const uri = Spicetify.URI.fromString(item.uri);
	const analysisRequestUrl = `https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${uri.id}?format=json`;

	const audioAnalysis = await Spicetify.CosmosAsync.get(analysisRequestUrl).catch(e =>
		console.error("[Visualizer]", e)
	);

	if (!audioAnalysis)
		return { error: "Error: The audio analysis could not be loaded, please check your internet connection" };

	if (typeof audioAnalysis !== "object") return { error: `Invalid audio analysis data (${audioAnalysis})` };

	if (!("track" in audioAnalysis) || !("segments" in audioAnalysis)) {
		const message =
			"error" in audioAnalysis && audioAnalysis.error
				? (audioAnalysis.error as string)
				: "message" in audioAnalysis && audioAnalysis.message
					? (audioAnalysis.message as string)
					: "Unknown error";

		const code = "code" in audioAnalysis ? (audioAnalysis.code as number) : null;

		if (code !== null) return { error: `Error ${code}: ${message}` };
		else return { error: message };
	}

	return { value: audioAnalysis };
}

export async function loadExtractedColor(
	item: Spicetify.PlayerTrack,
	metadataService: MetadataService
): Promise<Result<Spicetify.Color>> {
	const result = await loadMetadata(
		metadataService,
		ExtensionKind.EXTRACTED_COLOR,
		"type.googleapis.com/spotify.context_track_color.ColorResult",
		ColorResult,
		item.metadata.image_url
	);

	if ("error" in result) {
		console.error(`[Visualizer] Could not load extracted color metadata. Status: ${CacheStatus[result.error]}`);
		return { value: Spicetify.Color.fromHex(DEFAULT_COLOR) };
	}

	const colorHex = result.value.colorLight?.rgb?.toString(16).padStart(6, "0");
	return { value: colorHex ? Spicetify.Color.fromHex(`#${colorHex}`) : Spicetify.Color.fromHex(DEFAULT_COLOR) };
}

export async function loadAudioAttributes(
	item: Spicetify.PlayerTrack,
	metadataService: MetadataService
): Promise<Result<PBValueTypeOf<typeof AudioAttributesV2>>> {
	const result = await loadMetadata(
		metadataService,
		ExtensionKind.AUDIO_ATTRIBUTES_V2,
		"type.googleapis.com/spotify.playlistmixing.extensions.audio_attributes.v2.AudioAttributes",
		AudioAttributesV2,
		item.uri
	);

	if ("error" in result) return { error: `Could not load audio attributes. Status: ${CacheStatus[result.error]}` };

	return { value: result.value };
}

export async function loadBeats(
	item: Spicetify.PlayerTrack,
	metadataService: MetadataService
): Promise<Result<PBValueTypeOf<typeof Beats>>> {
	const result = await loadMetadata(
		metadataService,
		ExtensionKind.BEATS,
		"type.googleapis.com/spotify.playlistmixing.extensions.mixbeats.Beats",
		Beats,
		item.uri
	);

	if ("error" in result) return { error: `Could not load beats. Status: ${CacheStatus[result.error]}` };

	return { value: result.value };
}

export async function loadVocalActivity(
	item: Spicetify.PlayerTrack,
	metadataService: MetadataService
): Promise<Result<PBValueTypeOf<typeof VocalActivity>>> {
	const result = await loadMetadata(
		metadataService,
		ExtensionKind.VOCAL_ACTIVITY,
		"type.googleapis.com/spotify.playlistmixing.extensions.mixvocalactivity.VocalActivity",
		VocalActivity,
		item.uri
	);

	if ("error" in result) return { error: `Could not load vocal activity. Status: ${CacheStatus[result.error]}` };

	return { value: result.value };
}

export async function loadThreebandWaveform(
	item: Spicetify.PlayerTrack,
	metadataService: MetadataService
): Promise<Result<PBValueTypeOf<typeof ThreebandWaveforms>>> {
	const result = await loadMetadata(
		metadataService,
		ExtensionKind.THREEBAND_WAVEFORMS,
		"type.googleapis.com/spotify.playlistmixing.extensions.mixthreebandwaveforms.ThreeBandWaveforms",
		ThreebandWaveforms,
		item.uri
	);

	if ("error" in result) return { error: `Could not load threeband waveform. Status: ${CacheStatus[result.error]}` };

	return { value: result.value };
}
