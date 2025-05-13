const stack = Object.freeze(['STANDARD', 'SPECIAL', 'REJECTED'] as const);

type Stack = typeof stack[number];

export const sort = (
	/** in centimeters */
	width: number,
	/** in centimeters */
	height: number,
	/** in centimeters */
	length: number,
	/** in kilograms */
	mass: number,
): Stack => {
	[
		width,
		height,
		length,
		mass,
	]
		.forEach(
			(value, index) => {
				const metric = (() => {
					switch (index) {
						case 0:
							return 'width';
						case 1:
							return 'height';
						case 2:
							return 'length';
						case 3:
							return 'mass';
						default:
							throw new Error(`Unknown metric: ${value}`);
					}
				})();
				if (
					typeof value !== 'number'
					|| isNaN(value)
				) throw new Error(`${metric} must be a number!`);
				if (value <= 0) throw new Error(`${metric} must be greater than 0!`);
			},
		);

	/** A package is bulky if its volume (Width x Height x Length) is greater than or equal to 1,000,000 cm³ or when one of its dimensions is greater or equal to 150 cm. */
	const bulky = (
		width * height * length >= 1_000_000
		|| [width, height, length].some((value) => value >= 150)
	);
	/** A package is heavy when its mass is greater or equal to 20 kg. */
	const heavy = mass >= 20;

	// packages that are both heavy and bulky are rejected.
	if (bulky && heavy) return 'REJECTED';
	// standard packages (those that are not bulky or heavy) can be handled normally.
	if (!bulky && !heavy) return 'STANDARD';
	// packages that are either heavy or bulky can't be handled automatically.
	return 'SPECIAL';
};
