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
		},
		setCalcState,
	] = React.useState<CalculatorState>(initialCalcState);

	const clearState = () => {
		setCalcState({ ...initialCalcState });
	};

	const [calculatedSig, setCalculatedSig] = React.useState<number>(0);
	const [pValue, setPValue] = React.useState<number>(0);

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

		setCalculatedSig(1);
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
							</tbody>
						</table>

						<button type="reset">Clear</button>
					</form>
				</div>
				<div>
					<h3>Significance</h3>
					<strong>Z-score:</strong> {calculatedSig}
					<br />
					<strong>P-value:</strong> {pValue}
					<br />
				</div>
			</div>
		</div>
	);
}

export default Calculator;
