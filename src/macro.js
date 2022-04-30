import {copy} from '@array-like/copy';
import {entropy, pos} from './fixtures.js';
import {increasing, decreasing} from './defaults.js';

const macro = (t, {search, array, length, delta, seed}) => {
	const {randint} = entropy(seed);
	// SETUP REF ARRAY
	// eslint-disable-next-line new-cap
	const ref = new array(length);
	for (let j = 0; j < length; ++j) ref[j] = randint(0, length);
	Array.prototype.sort.call(ref, delta);

	// SETUP TEST ARRAY
	// eslint-disable-next-line new-cap
	const a = new array(length);
	copy(ref, 0, length, a, 0);

	// TEST SEARCH
	let i = a.length;

	if (i > 0) {
		// CHECK > OUTER BOUND
		let r = search(delta, a, 0, length, length);
		t.true(r < 0, 'not found ' + length);
		let x = delta(-1, 0) < 0 ? length : 0;
		t.is(pos(r), x, `where === ${x}`);

		// CHECK BODY
		while (i--) {
			r = search(delta, a, 0, length, a[i]);
			t.true(r >= 0, `found  a[${i}]`);
			t.deepEqual(a[r], a[i], `val  === ${a[i]}`);
		}

		// CHECK < OUTER BOUND
		r = search(delta, a, 0, length, -1);
		t.true(r < 0, 'not found -1');
		x = delta(-1, 0) > 0 ? length : 0;
		t.is(pos(r), x, 'where === ' + x);
	} else {
		const r = search(delta, a, 0, length, -1);
		t.true(r < 0, 'not found -1');
		t.is(pos(r), 0, 'where === 0');
	}

	// CHECK NOT MODIFIED
	t.deepEqual(a, ref, 'not modified check');
};

const deltaName = (delta) => {
	switch (delta) {
		case increasing:
			return 'increasing';
		case decreasing:
			return 'decreasing';
		default:
			return delta.name || '<unknown delta function>';
	}
};

macro.title = (title, {search, array, length, delta, seed}) =>
	title ??
	`${search.name || '<unknown search function>'} (new ${
		array.name
	}(${length})[${JSON.stringify(seed)}], ${deltaName(delta)})`;

export default macro;
