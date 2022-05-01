import {copy} from '@array-like/copy';
import {entropy} from './fixtures.js';
import {increasing, decreasing} from './defaults.js';

const macro = (
	t,
	{search, array, length, delta, min, max, seed, pos, found},
) => {
	const {randint} = entropy(seed);
	// SETUP REF ARRAY

	let _max = max;
	++_max;
	let _min = min;
	--_min;
	// eslint-disable-next-line new-cap
	const ref = new array(length);
	for (let j = 0; j < length; ++j) ref[j] = randint(min, _max);
	Array.prototype.sort.call(ref, delta);

	// SETUP TEST ARRAY
	// eslint-disable-next-line new-cap
	const a = new array(length);
	copy(ref, 0, length, a, 0);

	// TEST SEARCH
	if (length > 0) {
		// CHECK > OUTER BOUND
		let v = delta(-1, 0) < 0 ? _max : _min;
		let r = search(delta, a, 0, length, v);
		t.false(found(delta, a, 0, length, r), `not found ${v}`);
		t.is(pos(delta, a, 0, length, r), length, `where === ${length}`);

		// CHECK BODY
		for (let i = length - 1; i >= 0; --i) {
			r = search(delta, a, 0, length, a[i]);
			t.true(found(delta, a, 0, length, r), `found  a[${i}]`);
			t.deepEqual(a[pos(delta, a, 0, length, r)], a[i], `val  === ${a[i]}`);
		}

		// CHECK < OUTER BOUND
		v = delta(-1, 0) > 0 ? _max : _min;
		r = search(delta, a, 0, length, v);
		t.false(found(delta, a, 0, length, r), 'not found -1');
		t.is(pos(delta, a, 0, length, r), 0, 'where === 0');
	} else {
		const r = search(delta, a, 0, length, -1);
		t.false(found(delta, a, 0, length, r), 'not found -1');
		t.is(pos(delta, a, 0, length, r), 0, 'where === 0');
	}

	// CHECK NOT MODIFIED
	t.deepEqual(a, ref, 'not modified check');
};

const deltaName = ({name, fn}) => {
	switch (fn) {
		case increasing:
			return 'increasing';
		case decreasing:
			return 'decreasing';
		default:
			return name || '<unknown delta function>';
	}
};

const unpackFunction = (object) => {
	if (typeof object === 'function') {
		return {
			name: object.name,
			fn: object,
		};
	}

	return object;
};

macro.title = (title, {search, array, length, delta, seed, min, max}) => {
	if (title !== undefined) return title;
	const {name: searchName} = unpackFunction(search);
	const deltaUnpacked = unpackFunction(delta);
	return `${searchName || '<unknown search function>'} (new ${
		array.name
	}(${length}){${min},${max}}${JSON.stringify(seed)}, ${deltaName(
		deltaUnpacked,
	)})`;
};

export default macro;
