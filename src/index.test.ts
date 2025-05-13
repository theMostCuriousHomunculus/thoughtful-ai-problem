import { it } from 'node:test';
import assert from 'node:assert';

import { sort } from './index.ts';

it(
	'should throw when an input is 0',
	() => {
		assert.throws(
			() => sort(
				0,
				100,
				100,
				10,
			),
		);
	},
);

it(
	'should throw when an input is negative',
	() => {
		assert.throws(
			() => sort(
				100,
				-1,
				100,
				10,
			),
		);
	},
);

it(
	'should throw when an input is not a number',
	() => {
		assert.throws(
			() => sort(
				// @ts-expect-error
				'100',
				50,
				80,
				10,
			),
		);
	},
);

it(
	'should throw when an input is NaN',
	() => {
		assert.throws(
			() => sort(
				NaN,
				50,
				80,
				10,
			),
		);
	},
);

it(
	'should return \'STANDARD\' when not bulky AND not heavy',
	() => {
		assert.equal(
			sort(
				60,
				70,
				100,
				10,
			),
			'STANDARD',
		);
	},
);

it(
	'should return \'REJECTED\' when bulky and heavy',
	() => {
		assert.equal(
			sort(
				120,
				160,
				40,
				25,
			),
			'REJECTED',
		);
	},
);

it(
	'should return \'SPECIAL\' when only bulky',
	() => {
		assert.equal(
			sort(
				120,
				160,
				100,
				15,
			),
			'SPECIAL',
		);
	},
);

it(
	'should return \'SPECIAL\' when only heavy',
	() => {
		assert.equal(
			sort(
				60,
				70,
				100,
				25,
			),
			'SPECIAL',
		);
	},
);
