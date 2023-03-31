'use client';

import { api } from '@/lib/axios';
import { notion } from '@/lib/notion';
import { parseCookies } from 'nookies';
import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

type BookProviderProps = {
	children: ReactNode;
};

type TitleProperty = {
	plain_text: string;
};

type Book = {
	object: string;
	id: string;
	icon: {
		external: {
			url: string;
		};
	};
	properties: {
		Author: {
			id: string;
			rich_text: TitleProperty[];
		};
		Rating: {
			id: string;
			type: string;
			select: {
				name: string;
			};
		};
		Status: {
			id: string;
			type: string;
			select: {
				id: string;
				name: string;
				color: string;
			};
		};
		Name: {
			id: string;
			type: string;
			title: TitleProperty[];
		};
		'Current Page': {
			id: string;
			type: number;
			number: number;
		};
		'Qtd. Pages': {
			id: string;
			type: number;
			number: number;
		};
		'Finished Date': {
			id: string;
			type: string;
			date: {
				start: string;
			};
		};
	};
};

type BookContextProps = {
	books: Book[] | null;
	getBooks: () => Promise<void>;
	onSetBooks: (booksData: Book[]) => void;
};

export const BookContext = createContext({} as BookContextProps);

export const BookContextProvider = ({ children }: BookProviderProps) => {
	const [books, setBooks] = useState<Book[] | null>([]);

	const { '@reading_dashboard:database_id': databaseIdCookie } = parseCookies();

	const getBooks = useCallback(async () => {
		try {
			const response = await api.get(`/book?db=${databaseIdCookie}`);

			const responseResults = response.data.results as Book[];

			console.log({ responseResults });

			setBooks(responseResults);
		} catch (error) {
			console.log(error);
		}
	}, [databaseIdCookie]);

	const onSetBooks = (booksData: Book[]) => {
		setBooks(booksData);
	};

	useEffect(() => {
		const fetchBooks = async () => {
			await getBooks();
		};

		fetchBooks();
	}, [getBooks]);

	return (
		<BookContext.Provider value={{ books, getBooks, onSetBooks }}>
			{children}
		</BookContext.Provider>
	);
};

export const useBook = () => useContext(BookContext);
