import './Calculator.css';

import React from 'react';

function Calculator() {
	const [
		numOfVisitorsControl,
		setNumOfVisitorsControl,
	] = React.useState<number>(0);
	const [
		numOfConversionsControl,
		setNumOfConversionsControl,
	] = React.useState<number>(0);
	const [
		conversionRateControl,
		setConversionRateControl,
	] = React.useState<number>(0);
	const [
		standardErrorControl,
		setStandardErrorControl,
	] = React.useState<number>(0);

	const [
		numOfVisitorsVariant,
		setNumOfVisitorsVariant,
	] = React.useState<number>(0);
	const [
		numOfConversionsVariant,
		setNumOfConversionsVariant,
	] = React.useState<number>(0);
	const [
		conversionRateVariant,
		setConversionRateVariant,
	] = React.useState<number>(0);
	const [
		standardErrorVariant,
		setStandardErrorVariant,
	] = React.useState<number>(0);

	const [calculatedSig, setCalculatedSig] = React.useState<number>(0);
	const [pValue, setPValue] = React.useState<number>(0);

	const handleControlVisitorChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNumOfVisitorsControl(parseInt(e.target.value));
	};

	const handleControlConversionChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNumOfConversionsControl(parseInt(e.target.value));
	};

	const handleVariantVisitorChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNumOfVisitorsVariant(parseInt(e.target.value));
	};

	const handleVariantConversionChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNumOfConversionsVariant(parseInt(e.target.value));
	};

	const calculateSignificance = () => {
		setConversionRateControl(
			numOfConversionsControl / numOfVisitorsControl
		);
		setStandardErrorControl(
			Math.sqrt(
				(conversionRateControl * (1 - conversionRateControl)) /
					numOfVisitorsControl
			)
		);

		setConversionRateVariant(
			numOfConversionsVariant / numOfVisitorsVariant
		);
		setStandardErrorVariant(
			Math.sqrt(
				(conversionRateVariant * (1 - conversionRateVariant)) /
					numOfVisitorsVariant
			)
		);

		setCalculatedSig(1);
	};

	return (
		<div className="calculator">
			<div>
				<header className="calculator-header">
					<h1>Statistical Significance Calculator</h1>
				</header>
				<div>
					<form noValidate autoComplete="off">
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
											id="visitors"
											type="number"
											value={numOfVisitorsControl}
											onChange={
												handleControlVisitorChange
											}
										/>
									</td>
									<td>
										<input
											id="conversions"
											type="number"
											value={numOfConversionsControl}
											onChange={
												handleControlConversionChange
											}
										/>
									</td>
									<td>{conversionRateControl}</td>
									<td>{standardErrorControl}</td>
								</tr>
								<tr>
									<tr>Variant</tr>
									<td>
										<input
											id="visitors"
											type="number"
											value={numOfVisitorsVariant}
											onChange={
												handleVariantVisitorChange
											}
										/>
									</td>
									<td>
										<input
											id="conversions"
											type="number"
											value={numOfConversionsVariant}
											onChange={
												handleVariantConversionChange
											}
										/>
									</td>
									<td>{conversionRateVariant}</td>
									<td>{standardErrorVariant}</td>
								</tr>
							</tbody>
						</table>

						<button onClick={() => calculateSignificance()}>
							Calculate
						</button>
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
