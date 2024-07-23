export function binarySearchIndex<T>(array: T[], converter: (value: T) => number, position: number): number {
	let lowerBound = 0;
	let upperBound = array.length;

	while (upperBound - lowerBound > 1) {
		const testIndex = Math.floor((upperBound + lowerBound) / 2);
		const pointPos = converter(array[testIndex]);

		if (pointPos <= position) lowerBound = testIndex;
		else upperBound = testIndex;
	}

	return lowerBound;
}

export function decibelsToAmplitude(decibels: number): number {
	return Math.min(Math.max(Math.pow(10, decibels / 20), 0), 1);
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
export function integrateLinearSegment(p1: CurveEntry, p2: CurveEntry): number {
	return -0.5 * (p1.x - p2.x) * (p1.y + p2.y);
}

export function sampleSegmentedFunctionLinear<T>(array: T[], getX: (value: T) => number, getY: (value: T) => number, position: number): number {
	const pointIndex = binarySearchIndex(array, getX, position);
	const point = array[pointIndex];

	if (pointIndex > array.length - 2) return getY(point);
	const nextPoint = array[pointIndex + 1];

	return mapLinear(position, getX(point), getX(nextPoint), getY(point), getY(nextPoint));
}

export function sampleAmplitudeMovingAverage(amplitudeCurve: CurveEntry[], position: number, windowSize: number): number {
	if (windowSize == 0)
		return sampleSegmentedFunctionLinear(
			amplitudeCurve,
			e => e.x,
			e => e.y,
			position
		);

	const windowStart = position - windowSize / 2;
	const windowEnd = position + windowSize / 2;
	const windowStartIndex = binarySearchIndex(amplitudeCurve, e => e.x, windowStart);
	const windowEndIndex = binarySearchIndex(amplitudeCurve, e => e.x, windowEnd);

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
		integral = integrateLinearSegment(p, p2);

		for (let i = windowStartIndex + 1; i < windowEndIndex; i++) {
			p1 = p2;
			p2 = amplitudeCurve[i + 1];

			integral += integrateLinearSegment(p1, p2);
		}

		p1 = p2;
		if (windowEndIndex > amplitudeCurve.length - 2) {
			integral += p1.y * (windowEnd - p1.x);
		} else {
			p2 = amplitudeCurve[windowEndIndex + 1];
			p = { x: windowEnd, y: mapLinear(windowEnd, p1.x, p2.x, p1.y, p2.y) };
			integral += integrateLinearSegment(p1, p);
		}
	}

	return integral / windowSize;
}

export function sampleAccumulatedIntegral(amplitudeCurve: CurveEntry[], position: number) {
	const index = binarySearchIndex(amplitudeCurve, e => e.x, position);
	const p1 = amplitudeCurve[index];

	if (index + 1 >= amplitudeCurve.length) return (p1.accumulatedIntegral ?? 0) + p1.y * (position - p1.x);

	const p2 = amplitudeCurve[index + 1];
	const mid = {
		x: position,
		y: mapLinear(position, p1.x, p2.x, p1.y, p2.y)
	};

	return (p1.accumulatedIntegral ?? 0) + integrateLinearSegment(p1, mid);
}
