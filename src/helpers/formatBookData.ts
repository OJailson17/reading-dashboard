import { CreateBook } from '@/components/Form/BookForm';

export const formatBookData = (bookData?: CreateBook) => {
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
				? bookData.qtd_page
				: bookData?.current_page || 0,
		goodreads_review: bookData?.goodreads_review || '',
	};

	return formattedData;
};
