import {ARRAY, LENGTH, DELTA} from './defaults.js';

const units = function* ({
	array: arrays = ARRAY,
	length: lengths = LENGTH,
	delta: deltas = DELTA,
}) {
	for (const array of arrays) {
		for (const length of lengths) {
			if (
				array.BYTES_PER_ELEMENT &&
				length > 2 ** (array.BYTES_PER_ELEMENT * 8)
			) {
				continue;
			}

			for (const delta of deltas) {
				yield {
					array,
					length,
					delta,
				};
			}
		}
	}
};

export default units;
