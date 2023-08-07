export function findSegmentIndex(audioAnalysis: SpotifyAudioAnalysis, position: number): number {
    let lowerBound = 0;
    let upperBound = audioAnalysis.segments.length;

    while (upperBound - lowerBound > 1) {
        const halfPoint = Math.floor((upperBound + lowerBound) / 2);
        const segmentStart = audioAnalysis.segments[halfPoint].start;

        if (segmentStart <= position) lowerBound = halfPoint;
        else upperBound = halfPoint;
    }

    return lowerBound;
}

export function decibelsToAmplitude(decibels: number): number {
    return Math.pow(10, decibels / 20);
}

export function smoothstep(x: number): number {
    //return x * x * x * (3 * x * (2 * x - 5) + 10);
    return x * x * (3 - 2 * x);
}

export function calculateAmplitude(audioAnalysis: SpotifyAudioAnalysis, position: number): number {
    const segments = audioAnalysis.segments;

    const segmentIndex = findSegmentIndex(audioAnalysis, position);
    const segment = segments[segmentIndex];
    const positionInSegment = position - segment.start;

    let p1: number, posP1: number, p2: number, posP2: number;
    if (positionInSegment > segment.loudness_max_time) {
        p1 = segment.loudness_max;
        posP1 = segment.loudness_max_time;

        p2 = segmentIndex < segments.length - 1 ?
            segments[segmentIndex + 1].loudness_start
            : segment.loudness_end;
        posP2 = segment.duration;
    } else if (positionInSegment > segment.loudness_max_time) {
        p1 = segment.loudness_start;
        posP1 = 0;

        p2 = segment.loudness_max;
        posP2 = segment.loudness_max_time;
    } else return decibelsToAmplitude(segment.loudness_max);

    p1 = decibelsToAmplitude(p1);
    p2 = decibelsToAmplitude(p2);

    let amplitude = (positionInSegment - posP1) / (posP2 - posP1);
    amplitude = smoothstep(amplitude);
    amplitude = amplitude * (p2 - p1) + p1;

    return amplitude;
}

export function sampleAmplitude(audioAnalysis: SpotifyAudioAnalysis, position: number, sampleCount: number, sampleSpacing: number): number {
    const start = position - (sampleCount - 1) * sampleSpacing / 2;

    let value = 0;
    for (let i = 0; i < sampleCount; i++)
        value += calculateAmplitude(audioAnalysis, start + i * sampleSpacing);

    return value / sampleCount;
}