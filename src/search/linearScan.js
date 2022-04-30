const linearScan = (diff, a, i, j, v) => {
	while (i < j) {
		const d = diff(a[i], v);
		if (d >= 0) {
			// eslint-disable-next-line no-bitwise
			return d === 0 ? i : ~i;
		}

		// eslint-disable-next-line no-bitwise,unicorn/prefer-math-trunc
		i = (i + 1) | 0;
	}

	// eslint-disable-next-line no-bitwise
	return ~j;
};

export default linearScan;
