import {product} from '@set-theory/cartesian-product';
import {ARRAY, LENGTH, DELTA, MIN, MAX} from './defaults.js';
import {
	arrayMaxValue,
	arrayMinValue,
	pos as _pos,
	found as _found,
} from './fixtures.js';

const units = function* ({
	array: arrays = ARRAY,
	length: lengths = LENGTH,
	delta: deltas = DELTA,
	min: mins = MIN,
	max: maxs = MAX,
	pos = (_delta, _a, _i, _j, r) => _pos(r),
	found = (_delta, _a, _i, _j, r) => _found(r),
}) {
	for (const [array, min] of product([arrays, mins])) {
		if (min < arrayMinValue(array)) continue;
		for (const max of maxs) {
			if (max > arrayMaxValue(array)) continue;
			for (const [length, delta] of product([lengths, deltas])) {
				yield {
					array,
					length,
					delta,
					min,
					max,
					pos,
					found,
				};
			}
		}
	}
};

export default units;
