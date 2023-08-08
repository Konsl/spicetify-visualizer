export function findPointIndex(amplitudeCurve: Point2D[], position: number): number {
    let lowerBound = 0;
    let upperBound = amplitudeCurve.length;

    while (upperBound - lowerBound > 1) {
        const testIndex = Math.floor((upperBound + lowerBound) / 2);
        const pointPos = amplitudeCurve[testIndex].x;

        if (pointPos <= position) lowerBound = testIndex;
        else upperBound = testIndex;
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

export function calculateAmplitude(amplitudeCurve: Point2D[], position: number): number {
    const pointIndex = findPointIndex(amplitudeCurve, position);
    const point = amplitudeCurve[pointIndex];

    if (pointIndex > amplitudeCurve.length - 2) return point.y;
    const nextPoint = amplitudeCurve[pointIndex + 1];

    let amplitude = (position - point.x) / (nextPoint.x - point.x);
    amplitude = smoothstep(amplitude);
    amplitude = amplitude * (nextPoint.y - point.y) + point.y;

    return amplitude;
}
