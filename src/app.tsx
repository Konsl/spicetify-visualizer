import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./css/app.module.scss";
import LoadingIcon from "./components/LoadingIcon";
import NCSVisualizer from "./components/renderer/NCSVisualizer";
import { CacheStatus, ExtensionKind, MetadataService } from "./metadata";
import { parseProtobuf } from "./protobuf/defs";
import { ColorResult } from "./protobuf/ColorResult";
import { ErrorData, ErrorHandlerContext, ErrorRecovery } from "./error";

type VisualizerState =
	| {
			state: "loading" | "running";
	  }
	| {
			state: "error";
			errorData: ErrorData;
	  };

export default function App() {
	const [state, setState] = useState<VisualizerState>({ state: "loading" });
	const [trackData, setTrackData] = useState<{ audioAnalysis?: SpotifyAudioAnalysis; themeColor: Spicetify.Color }>({
		themeColor: Spicetify.Color.fromHex("#535353")
	});

	const updateState = useCallback(
		(newState: VisualizerState) =>
			setState(oldState => {
				if (oldState.state === "error" && oldState.errorData.recovery === ErrorRecovery.NONE) return oldState;

				return newState;
			}),
		[]
	);

	const onError = useCallback((msg: string, recovery: ErrorRecovery) => {
		updateState({
			state: "error",
			errorData: {
				message: msg,
				recovery
			}
		});
	}, []);

	const isUnrecoverableError = state.state === "error" && state.errorData.recovery === ErrorRecovery.NONE;

	const metadataService = useMemo(() => new MetadataService(), []);

	const updatePlayerState = useCallback(
		async (newState: Spicetify.PlayerState) => {
			const item = newState?.item;

			if (!item) {
				onError("Start playing a song to see the visualization!", ErrorRecovery.SONG_CHANGE);
				return;
			}

			const uri = Spicetify.URI.fromString(item.uri);
			if (uri.type !== Spicetify.URI.Type.TRACK) {
				onError("Error: The type of track you're listening to is currently not supported", ErrorRecovery.SONG_CHANGE);
				return;
			}

			updateState({ state: "loading" });

			const analysisRequestUrl = `https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${uri.id}?format=json`;
			const [audioAnalysis, vibrantColor] = await Promise.all([
				Spicetify.CosmosAsync.get(analysisRequestUrl).catch(e => console.error("[Visualizer]", e)) as Promise<unknown>,
				metadataService
					.fetch(ExtensionKind.EXTRACTED_COLOR, item.metadata.image_url)
					.catch(s => console.error(`[Visualizer] Could not load extracted color metadata. Status: ${CacheStatus[s]}`))
					.then(colors => {
						if (
							!colors ||
							colors.value.length === 0 ||
							colors.typeUrl !== "type.googleapis.com/spotify.context_track_color.ColorResult"
						)
							return Spicetify.Color.fromHex("#535353");

						const colorResult = parseProtobuf(colors.value, ColorResult);
						const colorHex = colorResult.colorLight?.rgb?.toString(16).padStart(6, "0") ?? "535353";
						return Spicetify.Color.fromHex(`#${colorHex}`);
					})
			]);

			if (!audioAnalysis) {
				onError(
					"Error: The audio analysis could not be loaded, please check your internet connection",
					ErrorRecovery.MANUAL
				);
				return;
			}

			if (typeof audioAnalysis !== "object") {
				onError(`Invalid audio analysis data (${audioAnalysis})`, ErrorRecovery.MANUAL);
				return;
			}

			if (!("track" in audioAnalysis) || !("segments" in audioAnalysis)) {
				const message =
					"error" in audioAnalysis && audioAnalysis.error
						? (audioAnalysis.error as string)
						: "message" in audioAnalysis && audioAnalysis.message
							? (audioAnalysis.message as string)
							: "Unknown error";

				const code = "code" in audioAnalysis ? (audioAnalysis.code as number) : null;

				if (code !== null) {
					onError(`Error ${code}: ${message}`, ErrorRecovery.MANUAL);
					return;
				} else {
					onError(message, ErrorRecovery.MANUAL);
					return;
				}
			}

			setTrackData({ audioAnalysis: audioAnalysis as SpotifyAudioAnalysis, themeColor: vibrantColor });
			updateState({ state: "running" });
		},
		[metadataService]
	);

	useEffect(() => {
		if (isUnrecoverableError) return;

		const songChangeListener = (event?: Event & { data: Spicetify.PlayerState }) => {
			if (event?.data) updatePlayerState(event.data);
		};

		Spicetify.Player.addEventListener("songchange", songChangeListener);
		updatePlayerState(Spicetify.Player.data);

		return () => Spicetify.Player.removeEventListener("songchange", songChangeListener as PlayerEventListener);
	}, [isUnrecoverableError, updatePlayerState]);

	return (
		<div className="visualizer-container">
			{!isUnrecoverableError && (
				<ErrorHandlerContext.Provider value={onError}>
					{/* <SpectrumVisualizer
                        isEnabled={state.state === "running"}
                        audioAnalysis={trackData.audioAnalysis}
                        themeColor={trackData.themeColor}
                    /> */}
					<NCSVisualizer
						isEnabled={state.state === "running"}
						audioAnalysis={trackData.audioAnalysis}
						themeColor={trackData.themeColor}
					/>
				</ErrorHandlerContext.Provider>
			)}

			{state.state === "loading" ? (
				<LoadingIcon />
			) : state.state === "error" ? (
				<div className={styles.error_container}>
					<div className={styles.error_message}>{state.errorData.message}</div>
					{state.errorData.recovery === ErrorRecovery.MANUAL && (
						<Spicetify.ReactComponent.ButtonPrimary onClick={() => updatePlayerState(Spicetify.Player.data)}>
							Try again
						</Spicetify.ReactComponent.ButtonPrimary>
					)}
				</div>
			) : null}
		</div>
	);
}
