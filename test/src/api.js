import test from 'ava';

import {macro, units, linearScan} from '#module';

const seed = [123, 456];

for (const unit of units({})) {
	test(macro, {...unit, seed, search: linearScan});
}

for (const unit of units({length: [333]})) {
	test(macro, {...unit, seed, search: linearScan});
}
