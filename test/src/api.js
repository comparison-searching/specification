import test from 'ava';

import {macro, units, linearScan} from '#module';

const seed = [123, 456];

for (const options of [{}, {length: [333]}]) {
	for (const unit of units(options)) {
		test(macro, {...unit, seed, search: linearScan});
	}
}
