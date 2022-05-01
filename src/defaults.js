export const increasing = (a, b) => Number(a - b);
export const decreasing = (a, b) => Number(b - a);

export const DELTA = [increasing, decreasing];

export const LENGTH = [0, 1, 2, 10, 31, 32, 33, 257];

export const MIN = [0];
export const MAX = [0, 1, 32, 256, 2 ** 31 - 1];

export const ARRAY = [
	Array,
	Int8Array,
	Uint8Array,
	Uint8ClampedArray,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array,
	BigInt64Array,
	BigUint64Array,
];
