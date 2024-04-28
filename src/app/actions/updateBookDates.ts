'use server';

import { revalidateTag } from 'next/cache';

type UpdateDatesProps = {
	book_id: string;
	started_date: string;
	finished_date: string;
};

export const updateBookDates = async ({
	book_id,
	started_date,
	finished_date,
}: UpdateDatesProps) => {
	await fetch(`${process.env.API_BASE_URL}/book/update/dates`, {
		method: 'PATCH',
		body: JSON.stringify({
			page_id: book_id,
			started_date,
			finished_date,
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
	revalidateTag('fetch-book-stats');
};
