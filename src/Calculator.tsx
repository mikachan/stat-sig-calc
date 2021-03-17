import './Calculator.css';

import React from 'react';

interface CalculatorState {
	numOfVisitorsControl: number;
	numOfConversionsControl: number;
	conversionRateControl: number;
	standardErrorControl: number;
	numOfVisitorsVariant: number;
	numOfConversionsVariant: number;
	conversionRateVariant: number;
	standardErrorVariant: number;
	confidence90: string;
	confidence95: string;
	confidence99: string;
	zScore: number;
	pValue: number;
}
function Calculator() {
	const initialCalcState: CalculatorState = {
		numOfVisitorsControl: 0,
		numOfConversionsControl: 0,
		conversionRateControl: 0,
		standardErrorControl: 0,
		numOfVisitorsVariant: 0,
		numOfConversionsVariant: 0,
		conversionRateVariant: 0,
		standardErrorVariant: 0,
		confidence90: 'No',
		confidence95: 'No',
		confidence99: 'No',
		zScore: 0,
		pValue: 0,
	};

	const [
		{
			numOfVisitorsControl,
			numOfConversionsControl,
			conversionRateControl,
			standardErrorControl,
			numOfVisitorsVariant,
			numOfConversionsVariant,
			conversionRateVariant,
			standardErrorVariant,
			confidence90,
			confidence95,
			confidence99,
			zScore,
			pValue,
		},
		setCalcState,
	] = React.useState<CalculatorState>(initialCalcState);

	const clearState = () => {
		setCalcState({ ...initialCalcState });
	};

	const roundUp = (num: number): number => {
		return +num.toFixed(2);
	};

	const calcConversionRate = (
		conversions: number,
		visitors: number
	): number => {
		return roundUp(conversions / visitors);
	};

	const calcStandardError = (
		conversionRate: number,
		visitors: number
	): number => {
		return roundUp(
			Math.sqrt((conversionRate * (1 - conversionRate)) / visitors)
		);
	};

	const calculateSignificance = () => {
		if (numOfConversionsControl & numOfVisitorsControl) {
			setCalcState((prevState) => ({
				...prevState,
				conversionRateControl: calcConversionRate(
					numOfConversionsControl,
					numOfVisitorsControl
				),
				standardErrorControl: calcStandardError(
					conversionRateControl,
					numOfVisitorsControl
				),
			}));
		}

		if (numOfConversionsVariant & numOfVisitorsVariant) {
			setCalcState((prevState) => ({
				...prevState,
				conversionRateVariant: calcConversionRate(
					numOfConversionsVariant,
					numOfVisitorsVariant
				),
				standardErrorVariant: calcStandardError(
					conversionRateVariant,
					numOfVisitorsVariant
				),
			}));
		}
	};

	return (
		<div className="calculator">
			<div>
				<header className="calculator-header">
					<h1>Statistical Significance Calculator</h1>
				</header>
				<div>
					<form noValidate autoComplete="off" onReset={clearState}>
						<table>
							<thead>
								<tr>
									<th></th>
									<th>Visitors</th>
									<th>Conversions</th>
									<th>Conversion Rate</th>
									<th>Standard Error</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Control</td>
									<td>
										<input
											id="visitorsControl"
											type="number"
											min={numOfConversionsControl}
											value={numOfVisitorsControl}
											onChange={(e) => {
												setCalcState((prevState) => ({
													...prevState,
													numOfVisitorsControl: parseInt(
														e.target.value
													),
												}));
												calculateSignificance();
											}}
										/>
									</td>
									<td>
										<input
											id="conversionsControl"
											type="number"
											min="0"
											max={numOfVisitorsControl}
											value={numOfConversionsControl}
											onChange={(e) => {
												setCalcState((prevState) => ({
													...prevState,
													numOfConversionsControl: parseInt(
														e.target.value
													),
												}));
												calculateSignificance();
											}}
										/>
									</td>
									<td>{conversionRateControl}</td>
									<td>{standardErrorControl}</td>
								</tr>
								<tr>
									<td>Variant</td>
									<td>
										<input
											id="visitorsVariant"
											type="number"
											min={numOfConversionsVariant}
											value={numOfVisitorsVariant}
											onChange={(e) => {
												setCalcState((prevState) => ({
													...prevState,
													numOfVisitorsVariant: parseInt(
														e.target.value
													),
												}));
												calculateSignificance();
											}}
										/>
									</td>
									<td>
										<input
											id="conversionsVariant"
											type="number"
											min="0"
											max={numOfVisitorsVariant}
											value={numOfConversionsVariant}
											onChange={(e) => {
												setCalcState((prevState) => ({
													...prevState,
													numOfVisitorsVariant: parseInt(
														e.target.value
													),
												}));
												calculateSignificance();
											}}
										/>
									</td>
									<td>{conversionRateVariant}</td>
									<td>{standardErrorVariant}</td>
								</tr>
								<tr>
									<td colSpan={5} align="right">
										<button type="reset">Clear</button>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<td colSpan={2}>
									<h3>Significance Levels</h3>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>90% confidence</td>
								<td>{confidence90}</td>
							</tr>
							<tr>
								<td>95% confidence</td>
								<td>{confidence95}</td>
							</tr>
							<tr>
								<td>99% confidence</td>
								<td>{confidence99}</td>
							</tr>
							<tr>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td>Z-score</td>
								<td>{zScore}</td>
							</tr>
							<tr>
								<td>P-value</td>
								<td>{pValue}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Calculator;
