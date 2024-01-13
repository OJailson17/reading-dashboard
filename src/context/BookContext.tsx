'use client';

import { useRouter } from 'next/navigation';
import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react';
import { toast } from 'react-toastify';

import { Book, CreateBook } from '@/@types/bookTypes';
import { api } from '@/lib/axios';
import { localStorageStrings } from '@/utils/constants/storageStrings';

type BookProviderProps = {
	children: ReactNode;
};

type onGetBooksProps = {
	databaseId: string;
	token: string;
};

type onCreateBookProps = {
	database_id: string;
	book: Partial<CreateBook>;
};

type BookContextProps = {
	books: Book[] | null;
	onGetBooks: (props: onGetBooksProps) => Promise<void>;
	onCreateBook: (props: onCreateBookProps) => Promise<void>;
};

export const BookContext = createContext({} as BookContextProps);

export const BookContextProvider = ({ children }: BookProviderProps) => {
	const [books, setBooks] = useState<Book[] | null>([]);

	const router = useRouter();

	// Make api call to get books data
	const getBooks = useCallback(async (databaseId: string) => {
		try {
			const response = await api.get(`/book?db=${databaseId}`);

			// const allBooks = results as Book[];
			const allBooks = response.data as Book[];

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

	const onCreateBook = async ({ book, database_id }: onCreateBookProps) => {
		try {
			await api.post(`/book/create?db=${database_id}`, book, {
				timeout: 30000,
				timeoutErrorMessage: 'It took too long, try again.',
			});

			toast('Book Created', {
				position: 'top-center',
				autoClose: 1500,
				theme: 'dark',
				type: 'success',
			});

			localStorage.setItem(localStorageStrings.CREATE_BOOK_SOURCE, 'true');

			setTimeout(async () => {
				return await Promise.resolve(router.push('/library'));
			}, 2500);
		} catch (error) {
			toast('An error ocurred', {
				position: 'top-center',
				autoClose: 1500,
				theme: 'dark',
				type: 'error',
			});
			console.log({ error });
		}
	};

	return (
		<BookContext.Provider value={{ books, onGetBooks, onCreateBook }}>
			{children}
		</BookContext.Provider>
	);
};

export const useBook = () => useContext(BookContext);
