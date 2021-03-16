import { render, screen } from '@testing-library/react';

import Calculator from './Calculator';

test('renders learn react link', () => {
	render(<Calculator />);
	const title = screen.getByText(/statistical significance calculator/i);
	expect(title).toBeInTheDocument();
});
