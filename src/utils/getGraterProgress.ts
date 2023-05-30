import { Book } from '@/types/bookTypes';

// type GraterProgressProps = {
// 	book
// }

export const getBookWithGraterProgress = (books: Book[]) => {
	// const boo = books?.map((book: Book) => {
	// 	return book.properties.Name.title[0].plain_text;
	// });

	const sortBooks = books
		.map(book => {
			return {
				name: book.properties.Name.title[0].plain_text,
				page: book.properties['Current Page'].number,
			};
		})
		.sort((a, b) => b.page - a.page);

	const booksNames = sortBooks.map(book => book.name);

	// console.log({ booksNames });

	return booksNames;
};
