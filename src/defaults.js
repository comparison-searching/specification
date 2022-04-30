export const increasing = (a, b) => a - b;
export const decreasing = (a, b) => b - a;

export const DELTA = [increasing, decreasing];

export const LENGTH = [0, 1, 2, 10, 31, 32, 33, 257];

export const ARRAY = [
	Array,
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array,
];
