import React, { useEffect, useState } from 'react';
import styles from './css/app.module.scss'
import LoadingIcon from './components/LoadingIcon';
import Visualizer from './components/Visualizer';
import { DEFAULT_THEME_COLOR } from './resources';

enum VisualizerState {
    LOADING,
    RUNNING,
    ERROR
}

export default function App() {
    const [state, setState] = useState<VisualizerState>(VisualizerState.LOADING);
    const [trackData, setTrackData] = useState<{ audioAnalysis?: SpotifyAudioAnalysis, themeColor?: string }>({});

    useEffect(() => {
        const updatePlayerState = async (newState: Spicetify.PlayerState) => {
            if (!newState.track) {
                setState(VisualizerState.ERROR);
                return;
            }

            const uri = newState.track.uri;
            if (!Spicetify.URI.isTrack(uri)) {
                setState(VisualizerState.ERROR);
                return;
            }

            setState(VisualizerState.LOADING);

            const [audioAnalysis, vibrantColor] = await Promise.all([
                Spicetify.getAudioData(uri)
                    .catch(() => undefined) as Promise<SpotifyAudioAnalysis | undefined>,
                Spicetify.colorExtractor(uri)
                    .then(colors => colors.VIBRANT)
                    .catch(() => undefined)
            ]);

            if (!audioAnalysis) {
                setState(VisualizerState.ERROR);
                return;
            }

            setTrackData({ audioAnalysis, themeColor: vibrantColor });
            setState(VisualizerState.RUNNING);
        };

        const songChangeListener = (event?: Event & { data: Spicetify.PlayerState }) => {
            if (event?.data) updatePlayerState(event.data);
        }

        Spicetify.Player.addEventListener("songchange", songChangeListener);
        updatePlayerState(Spicetify.Player.data);

        return () => Spicetify.Player.removeEventListener("songchange", songChangeListener as PlayerEventListener);
    }, []);

    return <div className={styles.container}>
        {state == VisualizerState.LOADING ? (
            <LoadingIcon />
        ) : state == VisualizerState.RUNNING ? (
            <Visualizer
                audioAnalysis={trackData.audioAnalysis as SpotifyAudioAnalysis}
                themeColor={trackData.themeColor ?? DEFAULT_THEME_COLOR} />
        ) : (
            <div className={styles.unavailable_message}>{"(• _ • )"}</div>
        )}
    </div>
}