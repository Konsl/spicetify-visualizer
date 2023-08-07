import styles from './css/app.module.scss'
import React from 'react'
import { DEFAULT_THEME_COLOR } from './resources';
import AnimatedCanvas from './components/AnimatedCanvas';
import LoadingIcon from './components/LoadingIcon';

class App extends React.Component<{}, {
    track?: Spicetify.ProvidedTrack,
    analysis?: SpotifyAudioAnalysis,

    loading: boolean,

    position: number,
    duration: number,

    themeColor?: string
}> {
    state = {
        track: undefined,
        analysis: undefined,

        loading: true,

        position: 0,
        duration: 0,

        themeColor: undefined,
    };

    onSongChange = (event?: Event & { data: Spicetify.PlayerState }) => {
        if (event?.data) this.updatePlayerState(event.data);
    }

    onProgress = (event?: Event & { data: number }) => {
        if (event?.data) this.updateProgress(event.data);
    }

    updatePlayerState = (state: Spicetify.PlayerState) => {
        if (state.track) {
            this.setState({
                track: state.track,
                analysis: undefined,
                loading: true,
                duration: state.duration
            });

            this.loadAnalysis(state.track);
        } else {
            this.setState({
                track: undefined,
                analysis: undefined,
                loading: false,
                duration: 0,
                themeColor: undefined
            });
        }
    }

    updateProgress = (progress: number) => {
        this.setState({ position: progress });
    }

    loadAnalysis = async (track: Spicetify.ProvidedTrack) => {
        const uri = track.uri;

        if (Spicetify.URI.isTrack(uri)) {
            try {
                const [response, color] = await Promise.all([
                    Spicetify.getAudioData(uri),
                    Spicetify.colorExtractor(track.uri)
                        .then(colors => colors.VIBRANT)
                ]);

                console.log(response);
                this.setState({ loading: false, analysis: response, themeColor: color });
            } catch (err) {
                this.setState({ loading: false });
            }
        } else {
            this.setState({ loading: false });
        }
    }

    componentDidMount(): void {
        Spicetify.Player.addEventListener("songchange", this.onSongChange);
        Spicetify.Player.addEventListener("onprogress", this.onProgress);

        this.updatePlayerState(Spicetify.Player.data);
        this.updateProgress(Spicetify.Player.getProgress());
    }

    componentWillUnmount(): void {
        Spicetify.Player.removeEventListener("songchange", this.onSongChange as PlayerEventListener);
        Spicetify.Player.removeEventListener("onprogress", this.onProgress as PlayerEventListener);
    }

    render() {
        return <>
            <div className={styles.container}>

                {this.state.analysis ?
                    <AnimatedCanvas data={this.state.themeColor ?? DEFAULT_THEME_COLOR} draw={(ctx, data, time) => {
                        ctx.fillStyle = data;
                        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                        ctx.fillStyle = "black";
                        ctx.fillRect(0, 0, 1, 1);
                    }} style={{"width": "100%", "height": "100%", "objectFit": "contain"}} onResize={(canvas) => {
                        const size = Math.min(canvas.clientWidth, canvas.clientHeight);
                        canvas.width = size;
                        canvas.height = size;
                    }} />

                    : this.state.loading ?
                        <LoadingIcon />
                        : <div className={styles.unavailable_message}>{"(• _ • )"}</div>
                }
            </div>
        </>
    }
}

export default App;
