import { CreateBook } from '@/@types/bookTypes';

type FormatDataProps = {
	bookData?: Partial<CreateBook>;
};

export const formatBookData = ({ bookData }: FormatDataProps) => {
	const formattedData: CreateBook = {
		name: bookData?.name || '',
		icon_url: bookData?.icon_url,
		genres:
			(bookData?.genres &&
				bookData?.genres.map(genre =>
					genre.replace(genre[0], genre[0].toUpperCase()),
				)) ||
			[],
		author: bookData?.author || '',
		status: bookData?.status || 'To read',
		language: bookData?.language || 'Portuguese',
		qtd_page: bookData?.qtd_page || 0,
		current_page:
			bookData?.status === 'Finished'
				? bookData.qtd_page || 0
				: bookData?.current_page || 0,
		goodreads_review: bookData?.goodreads_review || '',
		book_review: bookData?.book_review || '',
		started_date: bookData?.started_date,
		finished_date: bookData?.finished_date,
	};

	if (
		!bookData?.book_review ||
		bookData?.book_review?.length <= 0 ||
		bookData?.book_review === 'none'
	) {
		formattedData.book_review = '90de4911-f67a-44bf-893e-3aeddb3e3e1e';
	}

	return formattedData;
};
