type PlayerEventListener = Parameters<typeof Spicetify.Player.removeEventListener>[1];

namespace SpotifyAudioAnalysis {
    interface Meta {
        analyzer_version: string;
        platform: string;
        detailed_status: string;
        status_code: number;
        timestamp: number;
        analysis_time: number;
        input_process: string;
    }

    interface Track {
        num_samples: number;
        duration: number;
        sample_md5: string;
        offset_seconds: number;
        window_seconds: number;
        analysis_sample_rate: number;
        analysis_channels: number;
        end_of_fade_in: number;
        start_of_fade_out: number;
        loudness: number;
        tempo: number;
        tempo_confidence: number;
        time_signature: number;
        time_signature_confidence: number;
        key: number;
        key_confidence: number;
        mode: number;
        mode_confidence: number;
        codestring: string;
        code_version: number;
        echoprintstring: string;
        echoprint_version: number;
        synchstring: string;
        synch_version: number;
        rhythmstring: string;
        rhythm_version: number;
    }

    interface Bar {
        start: number;
        duration: number;
        confidence: number;
    }

    interface Beat {
        start: number,
        duration: number,
        confidence: number
    }

    interface Section {
        start: number,
        duration: number,
        confidence: number,
        loudness: number,
        tempo: number,
        tempo_confidence: number,
        key: number,
        key_confidence: number,
        mode: number,
        mode_confidence: number,
        time_signature: number,
        time_signature_confidence: number
    }

    interface Segment {
        start: number,
        duration: number,
        confidence: number,
        loudness_start: number,
        loudness_max: number,
        loudness_max_time: number,
        loudness_end: number,
        pitches: [number, number, number, number, number, number, number, number, number, number, number, number],
        timbre: [number, number, number, number, number, number, number, number, number, number, number, number]
    }

    interface Tatum {
        start: number,
        duration: number,
        confidence: number
    }
}

interface SpotifyAudioAnalysis {
    meta: SpotifyAudioAnalysis.Meta;
    track: SpotifyAudioAnalysis.Track;
    bars: SpotifyAudioAnalysis.Bar[];
    beats: SpotifyAudioAnalysis.Beat[];
    sections: SpotifyAudioAnalysis.Section[];
    segments: SpotifyAudioAnalysis.Segment[];
    tatums: SpotifyAudioAnalysis.Tatum[];
}
