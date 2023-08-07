declare module 'fastnoise-lite';

namespace FastNoise {
    enum NoiseType {
        OpenSimplex2,
		OpenSimplex2S,
		Cellular,
		Perlin,
		ValueCubic,
		Value
    }

    enum RotationType3D {
        None,
		ImproveXYPlanes,
		ImproveXZPlanes
    }

    enum FractalType {
		None,
		FBm,
		Ridged,
		PingPong,
		DomainWarpProgressive,
		DomainWarpIndependent
	}

    enum CellularDistanceFunction {
		Euclidean,
		EuclideanSq,
		Manhattan,
		Hybrid
	}

	enum CellularReturnType {
		CellValue,
		Distance,
		Distance2,
		Distance2Add,
		Distance2Sub,
		Distance2Mul,
		Distance2Div
	}

	enum DomainWarpType {
		OpenSimplex2,
		OpenSimplex2Reduced,
		BasicGrid
	}

	enum TransformType3D {
		None,
		ImproveXYPlanes,
		ImproveXZPlanes,
		DefaultOpenSimplex2
	}
}

class FastNoise {
    constructor(seed: number);

    SetSeed(seed: number): void;
    SetFrequency(frequency: number): void;
    SetNoiseType(noiseType: FastNoise.NoiseType): void;
	SetRotationType3D(rotationType3D: FastNoise.RotationType3D): void;
	SetFractalType(fractalType: FastNoise.FractalType): void;
	SetFractalOctaves(octaves: number): void;
	SetFractalLacunarity(lacunarity: number): void;
	SetFractalGain(gain: number): void;
	SetFractalWeightedStrength(weightedStrength: number): void;
	SetFractalPingPongStrength(pingPongStrength: number): void;
	SetCellularDistanceFunction(cellularDistanceFunction: FastNoise.CellularDistanceFunction): void;
	SetCellularReturnType(cellularReturnType: FastNoise.CellularReturnType): void;
    SetCellularJitter(cellularJitter: number): void;
	SetDomainWarpType(domainWarpType: FastNoise.DomainWarpType): void;
    SetDomainWarpAmp(domainWarpAmp: number): void;

    GetNoise(x: number, y: number, z?: number): number;
    DomainWrap(coord: Vector2 | Vector3): void;
}

class Vector2 {
    x: number;
    y: number;

	constructor(x: number, y: number);
}

class Vector3 {
    x: number;
    y: number;
    z: number;
    
	constructor(x: number, y: number, z: number);
}

export default FastNoise;
