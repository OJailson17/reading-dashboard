'use client';

// import { results } from 'fakeData';
import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';
import { api } from '@/lib/axios';

import { Book } from '@/types/bookTypes';

type BookProviderProps = {
	children: ReactNode;
};

type onGetBooksProps = {
	databaseId: string;
	token: string;
};

type BookContextProps = {
	books: Book[] | null;
	onGetBooks: (props: onGetBooksProps) => Promise<void>;
};

export const BookContext = createContext({} as BookContextProps);

export const BookContextProvider = ({ children }: BookProviderProps) => {
	const [books, setBooks] = useState<Book[] | null>([]);

	// Make api call to get books data
	const getBooks = useCallback(async (databaseId: string) => {
		try {
			const response = await api.get(`/book/?db=${databaseId}`);

			// const allBooks = results as Book[];
			const allBooks = response.data.results as Book[];

			// Set the api response to books state
			setBooks(allBooks);
		} catch (error) {
			console.log(error);
		}
	}, []);

	// Verify if database id and token exist then call the getBooks function
	const onGetBooks = async ({ databaseId, token }: onGetBooksProps) => {
		if (token && databaseId) {
			await getBooks(databaseId);
		}
	};

	return (
		<BookContext.Provider value={{ books, onGetBooks }}>
			{children}
		</BookContext.Provider>
	);
};

export const useBook = () => useContext(BookContext);
