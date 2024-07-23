import React, { useCallback, useEffect, useState } from "react";
import styles from "./css/app.module.scss";
import LoadingIcon from "./components/LoadingIcon";
import NCSVisualizer from "./components/renderer/NCSVisualizer";
import SpectrumVisualizer from "./components/renderer/SpectrumVisualizer";

enum VisualizerState {
	LOADING,
	RUNNING,
	ERROR_NOT_PLAYING,
	ERROR_UNSUPPORTED_TRACK_TYPE,
	ERROR_NO_NETWORK,
	ERROR_UNKNOWN
}

export default function App() {
	const [state, setState] = useState<VisualizerState>(VisualizerState.LOADING);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [trackData, setTrackData] = useState<{ audioAnalysis?: SpotifyAudioAnalysis; themeColor: Spicetify.Color }>({
		themeColor: Spicetify.Color.fromHex("#535353")
	});

	useEffect(() => {
		const updatePlayerState = async (newState: Spicetify.PlayerState) => {
			const item = newState?.item;

			if (!item) {
				setState(VisualizerState.ERROR_NOT_PLAYING);
				return;
			}

			const uri = Spicetify.URI.fromString(item.uri);
			if (uri.type !== Spicetify.URI.Type.TRACK) {
				setState(VisualizerState.ERROR_UNSUPPORTED_TRACK_TYPE);
				return;
			}

			setState(VisualizerState.LOADING);

			const analysisRequestUrl = `https://spclient.wg.spotify.com/audio-attributes/v1/audio-analysis/${uri.id}?format=json`;
			const [audioAnalysis, vibrantColor] = await Promise.all([
				Spicetify.CosmosAsync.get(analysisRequestUrl).catch(console.error) as Promise<SpotifyAudioAnalysis | undefined>,
				Spicetify.extractColorPreset(item.metadata.image_url).then(colors => colors[0].colorLight)
			]);

			console.log("[Visualizer] Audio Analysis:", audioAnalysis);

			if (!audioAnalysis) {
				setState(VisualizerState.ERROR_NO_NETWORK);
				return;
			}

			if (audioAnalysis.error) {
				onError(`Error ${audioAnalysis.error.status}: ${audioAnalysis.error.message}`);
				return;
			}

			setTrackData({ audioAnalysis, themeColor: vibrantColor });
			setState(VisualizerState.RUNNING);
		};

		const songChangeListener = (event?: Event & { data: Spicetify.PlayerState }) => {
			if (event?.data) updatePlayerState(event.data);
		};

		Spicetify.Player.addEventListener("songchange", songChangeListener);
		updatePlayerState(Spicetify.Player.data);

		return () => Spicetify.Player.removeEventListener("songchange", songChangeListener as PlayerEventListener);
	}, []);

	const onError = useCallback((msg: string) => {
		setErrorMessage(msg);
		setState(VisualizerState.ERROR_UNKNOWN);
	}, []);

	return (
		<div className="visualizer-container">
			<SpectrumVisualizer
				isEnabled={state == VisualizerState.RUNNING}
				onError={onError}
				audioAnalysis={trackData.audioAnalysis}
				themeColor={trackData.themeColor}
			/>
			<NCSVisualizer
				isEnabled={state == VisualizerState.RUNNING}
				onError={onError}
				audioAnalysis={trackData.audioAnalysis}
				themeColor={trackData.themeColor}
			/>

			{state == VisualizerState.LOADING ? (
				<LoadingIcon />
			) : state == VisualizerState.ERROR_NOT_PLAYING ? (
				<div className={styles.unavailable_message}>{"Start playing a song to see the visualization!"}</div>
			) : state == VisualizerState.ERROR_UNSUPPORTED_TRACK_TYPE ? (
				<div className={styles.unavailable_message}>{"Error: The type of track you're listening to is currently not supported"}</div>
			) : state == VisualizerState.ERROR_NO_NETWORK ? (
				<div className={styles.unavailable_message}>
					{"Error: The audio analysis could not be loaded, please check your internet connection"}
				</div>
			) : state == VisualizerState.ERROR_UNKNOWN ? (
				<div className={styles.unavailable_message}>{errorMessage}</div>
			) : null}
		</div>
	);
}
