'use server';

import { revalidateTag } from 'next/cache';

type UpdatePagesProps = {
	book_id: string;
	current_page: number;
};

export const updateBookPage = async ({
	book_id,
	current_page,
}: UpdatePagesProps) => {
	await fetch(`${process.env.API_BASE_URL}/book/update/page`, {
		method: 'PATCH',
		body: JSON.stringify({
			page_id: book_id,
			current_page,
		}),
	})
		.then(res => res.json())
		.catch(err => console.log(err));

	revalidateTag('fetch-books');
	revalidateTag('fetch-book-stats');
};
