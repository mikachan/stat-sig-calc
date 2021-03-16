import './Calculator.css';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
				width: '25ch',
			},
		},
	})
);

function Calculator() {
	const classes = useStyles();

	return (
		<div className="calculator">
			<Container maxWidth="lg">
				<header className="calculator-header">
					<h1>Statistical Significance Calculator</h1>
				</header>
				<form className={classes.root} noValidate autoComplete="off">
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
					<Button variant="contained" color="primary" type="submit">
						Calculate
					</Button>
				</form>
			</Container>
		</div>
	);
}

export default Calculator;
