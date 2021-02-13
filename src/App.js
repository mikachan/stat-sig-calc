function App() {
	return (
		<div className="bg-green-600 text-center">
			<div className="flex flex-col items-center justify-center text-white h-screen">
				<header>
					<h1 className="text-2xl">
						Statistical Significance Calculator
					</h1>
				</header>
				<div className="text-white">
					<div>
						<label>
							<p>Visitors:</p>
							<input type="number" name="visitors" />
						</label>
					</div>
					<div>
						<label>
							<p>Conversions:</p>
							<input type="number" name="conversions" />
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
