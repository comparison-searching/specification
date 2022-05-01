import {_fisheryates, _shuffle, _randint} from '@randomized/random';
import {splitmix64, nextFloat64} from '@entropy-source/pseudo-random';

export const entropy = (seed) => {
	const prng = splitmix64(seed);
	const random = () => nextFloat64(prng);
	const randint = _randint(random);
	const sample = _fisheryates(randint);
	const shuffle = _shuffle(sample);
	return {
		prng,
		random,
		randint,
		sample,
		shuffle,
	};
};

// eslint-disable-next-line no-bitwise
export const pos = (v) => (v >> 31) ^ v;

export const found = (v) => v >= 0;

export const arrayMinValue = (ctor) => {
	switch (ctor) {
		case Array:
		case Float32Array:
		case Float64Array:
			return Number.NEGATIVE_INFINITY;
		case Uint8Array:
		case Uint8ClampedArray:
		case Uint16Array:
		case Uint32Array:
			// eslint-disable-next-line no-bitwise
			return 0 >>> 0;
		case BigUint64Array:
			return 0n;
		case Int8Array:
		case Int16Array:
		case Int32Array:
			return -(2 ** (ctor.BYTES_PER_ELEMENT * 8 - 1));

		case BigInt64Array:
			return -(2n ** 63n);
		default:
			throw new Error(`unknown array constructor ${ctor}`);
	}
};

export const arrayMaxValue = (ctor) => {
	switch (ctor) {
		case Array:
		case Float32Array:
		case Float64Array:
			return Number(Number.POSITIVE_INFINITY);
		case Uint8Array:
		case Uint8ClampedArray:
		case Uint16Array:
		case Uint32Array:
			// eslint-disable-next-line no-bitwise
			return (2 ** (ctor.BYTES_PER_ELEMENT * 8) - 1) >>> 0;
		case BigUint64Array:
			return 2n ** 64n - 1n;
		case Int8Array:
		case Int16Array:
		case Int32Array:
			// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
			return (2 ** (ctor.BYTES_PER_ELEMENT * 8 - 1) - 1) | 0;

		case BigInt64Array:
			return 2n ** 63n - 1n;
		default:
			throw new Error(`unknown array constructor ${ctor}`);
	}
};

export const arrayValue = (ctor, v) => {
	switch (ctor) {
		case BigInt64Array:
		case BigUint64Array:
			return BigInt(v);
		default:
			return v;
	}
};
