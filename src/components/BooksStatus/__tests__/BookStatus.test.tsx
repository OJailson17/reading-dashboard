import { render, screen } from '@testing-library/react';

import { BookStatus } from '..';

describe('Book Status', () => {
	it('it should be able to render the right percentage', async () => {
		const amountOfBooks = 10;
		const amountOfFinishedBooks = 4;

		render(
			<BookStatus
				amountOfBooks={amountOfBooks}
				amountOfFinishedBooks={amountOfFinishedBooks}
			/>,
		);

		const donutPercentage = await screen.findByText('40%');

		expect(donutPercentage).toBeInTheDocument();
	});
	it('it should be able to render the right amount of total books', async () => {
		const amountOfBooks = 18;
		const amountOfFinishedBooks = 4;

		render(
			<BookStatus
				amountOfBooks={amountOfBooks}
				amountOfFinishedBooks={amountOfFinishedBooks}
			/>,
		);

		const totalBooks = await screen.findByText('18');

		expect(totalBooks).toBeInTheDocument();
	});

	it('it should be able to render the right amount of finished books', async () => {
		const amountOfBooks = 10;
		const amountOfFinishedBooks = 9;

		render(
			<BookStatus
				amountOfBooks={amountOfBooks}
				amountOfFinishedBooks={amountOfFinishedBooks}
			/>,
		);

		const totalBooks = await screen.findByText('9');

		expect(totalBooks).toBeInTheDocument();
	});
});
