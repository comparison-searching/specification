import {product} from '@set-theory/cartesian-product';

import {ARRAY, LENGTH, DELTA, MIN, MAX} from './defaults.js';
import {
	arrayMaxValue,
	arrayMinValue,
	pos as _pos,
	found as _found,
	arrayValue,
} from './fixtures.js';

const units = function* ({
	array: arrays = ARRAY,
	length: lengths = LENGTH,
	delta: deltas = DELTA,
	min: mins = MIN,
	max: maxs = MAX,
	pos = _pos,
	found = _found,
}) {
	for (const [array, min] of product([arrays, mins])) {
		if (arrayValue(array, min) < arrayMinValue(array)) continue;
		for (const max of maxs) {
			if (arrayValue(array, max) > arrayMaxValue(array)) continue;
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
