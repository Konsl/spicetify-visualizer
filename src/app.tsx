import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./css/app.module.scss";
import LoadingIcon from "./components/LoadingIcon";
import { ErrorData, ErrorHandlerContext, ErrorRecovery } from "./error";
import { MainMenuButton } from "./menu";
import { createVisualizerWindow } from "./window";
import { useFullscreenElement } from "./hooks";
import { MetadataService } from "spicetify-utils";
import { LoaderID, LOADERS, RENDERERS, TrackData } from "./defs";

type VisualizerState =
	| {
			state: "loading" | "running";
	  }
	| {
			state: "error";
			errorData: ErrorData;
	  };

type CachedTrackData = {
	uri: string;
	trackData: TrackData;
};

export default function App(props: {
	isSecondaryWindow?: boolean;
	onWindowDestroyed?: () => {};
	initialRenderer?: string;
}) {
	const [rendererId, setRendererId] = useState<string>(() => {
		const propsRenderer = props.initialRenderer;
		if (propsRenderer && propsRenderer in RENDERERS) return propsRenderer;

		const searchParams = new URLSearchParams(Spicetify.Platform?.History?.location?.search || "");
		const searchRenderer = searchParams.get("renderer");
		if (searchRenderer && searchRenderer in RENDERERS) return searchRenderer;

		return "ncs";
	});
	useEffect(() => {
		const searchParams = new URLSearchParams();
		searchParams.set("renderer", rendererId);

		Spicetify.Platform?.History?.replace({ search: searchParams.toString() });
	}, [rendererId]);
	const Renderer = RENDERERS[rendererId]?.renderer;

	const containerRef = useRef<HTMLDivElement | null>(null);
	if (containerRef.current && !containerRef.current.ownerDocument.defaultView) props.onWindowDestroyed?.();

	const isFullscreen = !!useFullscreenElement(containerRef.current?.ownerDocument);

	const [state, setState] = useState<VisualizerState>({ state: "loading" });
	const cachedTrackData = useRef<CachedTrackData>({
		uri: "",
		trackData: {}
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
		async (newState: Spicetify.PlayerState, rendererId: string) => {
			const item = newState?.item;

			if (!item) {
				onError("Start playing a song to see the visualization!", ErrorRecovery.SONG_CHANGE);
				return;
			}

			const uri = Spicetify.URI.fromString(item.uri);
			if (uri.type !== Spicetify.URI.Type.TRACK) {
				onError(
					"Error: The type of track you're listening to is currently not supported",
					ErrorRecovery.SONG_CHANGE
				);
				return;
			}

			const oldCache = cachedTrackData.current;
			const requiredTrackData = new Set(RENDERERS[rendererId]?.requiredAudioData ?? []);
			if (item.uri === oldCache.uri) {
				for (const [id, value] of Object.entries(oldCache.trackData))
					if (!value.error) requiredTrackData.delete(id as LoaderID);
			}
			if (requiredTrackData.size === 0) return;

			updateState({ state: "loading" });

			const trackDataPromises = [...requiredTrackData].map(id =>
				LOADERS[id](item, metadataService).then(r => [id, r])
			);
			const newTrackData: TrackData = Object.fromEntries(await Promise.all(trackDataPromises));

			const trackData: TrackData = {
				...(oldCache.uri === item.uri ? oldCache.trackData : {}),
				...newTrackData
			};

			if (Spicetify.Player.data?.item?.uri !== item.uri) return;

			cachedTrackData.current = {
				uri: item.uri,
				trackData
			};
			updateState({ state: "running" });
		},
		[metadataService, rendererId]
	);

	useEffect(() => {
		if (isUnrecoverableError) return;

		const songChangeListener = (event?: Event & { data: Spicetify.PlayerState }) => {
			if (event?.data) updatePlayerState(event.data, rendererId);
		};

		Spicetify.Player.addEventListener("songchange", songChangeListener);
		updatePlayerState(Spicetify.Player.data, rendererId);

		return () => Spicetify.Player.removeEventListener("songchange", songChangeListener as PlayerEventListener);
	}, [isUnrecoverableError, updatePlayerState, rendererId]);

	return (
		<div className="visualizer-container" ref={containerRef}>
			{!isUnrecoverableError && (
				<>
					<ErrorHandlerContext.Provider value={onError}>
						{Renderer && (
							<Renderer
								isEnabled={state.state === "running"}
								trackData={cachedTrackData.current.trackData}
							/>
						)}
					</ErrorHandlerContext.Provider>
					<MainMenuButton
						className={styles.main_menu_button}
						renderInline={props.isSecondaryWindow || isFullscreen}
						currentRendererId={rendererId}
						isFullscreen={isFullscreen}
						onEnterFullscreen={() => {
							containerRef.current?.requestFullscreen();
						}}
						onExitFullscreen={() => {
							containerRef.current?.ownerDocument.exitFullscreen();
						}}
						onOpenWindow={() => createVisualizerWindow(rendererId)}
						onSelectRenderer={id => setRendererId(id)}
					/>
				</>
			)}

			{state.state === "loading" ? (
				<LoadingIcon />
			) : state.state === "error" ? (
				<div className={styles.error_container}>
					<div className={styles.error_message}>{state.errorData.message}</div>
					{state.errorData.recovery === ErrorRecovery.MANUAL && (
						<Spicetify.ReactComponent.ButtonPrimary
							onClick={() => updatePlayerState(Spicetify.Player.data, rendererId)}
						>
							Try again
						</Spicetify.ReactComponent.ButtonPrimary>
					)}
				</div>
			) : null}
		</div>
	);
}
