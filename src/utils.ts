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

export function mapLinear(value: number, iMin: number, iMax: number, oMin: number, oMax: number): number {
	value = (value - iMin) / (iMax - iMin);
	value = value * (oMax - oMin) + oMin;
	return value;
}

// calculate the integral of the linear function through p1 and p2 between p1.x and p2.x
export function integrateLinearFunction(p1: Point2D, p2: Point2D): number {
	return -0.5 * (p1.x - p2.x) * (p1.y + p2.y);
}

export function calculateAmplitude(amplitudeCurve: Point2D[], position: number): number {
	const pointIndex = findPointIndex(amplitudeCurve, position);
	const point = amplitudeCurve[pointIndex];

	if (pointIndex > amplitudeCurve.length - 2) return point.y;
	const nextPoint = amplitudeCurve[pointIndex + 1];

	return mapLinear(position, point.x, nextPoint.x, point.y, nextPoint.y);
}

export function sampleAmplitudeMovingAverage(amplitudeCurve: Point2D[], position: number, windowSize: number): number {
	if (windowSize == 0) return calculateAmplitude(amplitudeCurve, position);

	const windowStart = position - windowSize / 2;
	const windowEnd = position + windowSize / 2;
	const windowStartIndex = findPointIndex(amplitudeCurve, windowStart);
	const windowEndIndex = findPointIndex(amplitudeCurve, windowEnd);

	let integral = 0;
	if (windowStartIndex == windowEndIndex) {
		const p1 = amplitudeCurve[windowStartIndex];

		if (windowStartIndex > amplitudeCurve.length - 2) return p1.y;
		const p2 = amplitudeCurve[windowStartIndex + 1];

		const yA = mapLinear(windowStart, p1.x, p2.x, p1.y, p2.y);
		const yB = mapLinear(windowEnd, p1.x, p2.x, p1.y, p2.y);

		return (yA + yB) / 2;
	} else {
		let p1 = amplitudeCurve[windowStartIndex];
		let p2 = amplitudeCurve[windowStartIndex + 1];

		let p = { x: windowStart, y: mapLinear(windowStart, p1.x, p2.x, p1.y, p2.y) };
		integral = integrateLinearFunction(p, p2);

		for (let i = windowStartIndex + 1; i < windowEndIndex; i++) {
			p1 = p2;
			p2 = amplitudeCurve[i + 1];

			integral += integrateLinearFunction(p1, p2);
		}

		p1 = p2;
		if (windowEndIndex > amplitudeCurve.length - 2) {
			integral += p1.y * (windowEnd - p1.x);
		} else {
			p2 = amplitudeCurve[windowEndIndex + 1];
			p = { x: windowEnd, y: mapLinear(windowEnd, p1.x, p2.x, p1.y, p2.y) };
			integral += integrateLinearFunction(p1, p);
		}
	}

	return integral / windowSize;
}
