import { PBBool, PBUInt32, PBMessage, make } from "./defs";

const Color = PBMessage({
	rgb: make(1, PBUInt32),
	isFallback: make(2, PBBool)
});

export const ColorResult = PBMessage({
	colorRaw: make(1, Color),
	colorLight: make(2, Color),
	colorDark: make(3, Color)
});
