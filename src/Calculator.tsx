import './Calculator.css';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

function Calculator() {
	return (
		<div className="calculator">
			<Container maxWidth="lg">
				<header className="calculator-header">
					<h1>Statistical Significance Calculator</h1>
				</header>
				<form noValidate autoComplete="off">
					<div>
						<TextField
							id="visitors"
							label="Number of Visitors"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							id="conversions"
							label="Number of Conversions"
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							Calculate
						</Button>
					</div>
				</form>
			</Container>
		</div>
	);
}

export default Calculator;
