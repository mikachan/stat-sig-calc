export enum ConfidenceLevels {
	Ninety = 90,
	NinetyFive = 95,
	NinetyNine = 99,
}

export const roundUp = (num: number): number => {
	return +num.toFixed(2);
};

export const calcConversionRate = (
	conversions: number,
	visitors: number
): number => {
	return conversions / visitors;
};

export const calcStandardError = (
	conversionRate: number,
	visitors: number
): number => {
	return Math.sqrt((conversionRate * (1 - conversionRate)) / visitors);
};

export const calcConfidence = (
	confidenceLevel: ConfidenceLevels,
	pValue: number
): string => {
	if (confidenceLevel === ConfidenceLevels.Ninety) {
		if (pValue < 0.1 || pValue > 0.9) return 'Yes';
	}

	if (confidenceLevel === ConfidenceLevels.NinetyFive) {
		if (pValue < 0.05 || pValue > 0.95) return 'Yes';
	}

	if (confidenceLevel === ConfidenceLevels.NinetyNine) {
		if (pValue < 0.01 || pValue > 0.99) return 'Yes';
	}

	return 'No';
};

export const calcZScore = (
	conversionRateControl: number,
	conversionRateVariant: number,
	standardErrorControl: number,
	standardErrorVariant: number
): number => {
	const zScore =
		(conversionRateControl - conversionRateVariant) /
		Math.sqrt(
			Math.pow(standardErrorControl, 2) +
				Math.pow(standardErrorVariant, 2)
		);

	return zScore;
};

const findNormalDistribution = (num: number) => {
	return Math.pow(Math.E, -Math.pow(num, 2) / 2) / Math.sqrt(2 * Math.PI);
};

export const calcPValue = (zScore: number): number => {
	return findNormalDistribution(zScore);
};
