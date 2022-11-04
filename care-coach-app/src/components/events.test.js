import { render, screen } from '@testing-library/react';
import Events from './events'; 

test('renders events component', () => {
	render(<Events/>);
});

describe('Given the form is rendered', () => {
	const defaultProps = {
		device: '',
		event: '',
		checkbox: false,
	};

	const { device, event, checkbox } = defaultProps;

	it('Then it should render the form', async () => {
		expect(await screen.findByText(device)).toBeInTheDocument();
		expect(await screen.findByText(event)).toBeInTheDocument();
		expect(await screen.findByText(checkbox)).toBeInTheDocument();
	});
}); 
