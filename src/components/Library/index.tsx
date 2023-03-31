'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState, SyntheticEvent, FormEvent } from 'react';
import { BookDialog } from '../BookDialog';
import {
	BookComponent,
	BookSlide,
	LibraryComponent,
	LibraryComponentWrapper,
} from './styles';

interface TitleProperty {
	plain_text: string;
}

interface Book {
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
	};
}

interface LibraryBooks {
	books: Book[];
	// onGetBooks: () => Promise<void>;
}

export const Library = ({ books }: LibraryBooks) => {
	const [chosenBook, setChosenBook] = useState<Book | null>(null);

	const handleChoseBook = (e: SyntheticEvent) => {
		const targetData = e.target as HTMLDivElement;

		const findChosenBook = books.find(
			book =>
				book.properties.Name.title[0].plain_text === targetData.dataset?.title,
		);

		if (!findChosenBook) {
			console.log('Data not found!');
			return;
		}

		setChosenBook(findChosenBook);
	};

	return (
		<LibraryComponentWrapper>
			<LibraryComponent>
				<p className='library-component-title'>Library</p>

				<BookSlide>
					<Dialog.Root>
						{books.map(book => (
							<Dialog.Trigger
								key={book.id}
								onClick={e => handleChoseBook(e)}
								style={{ border: 'none', borderRadius: '10px' }}
							>
								<BookComponent>
									{book.icon?.external?.url ? (
										/* eslint-disable-next-line @next/next/no-img-element */
										<img
											src={book?.icon?.external?.url}
											alt=''
											style={{
												borderRadius: '10px',
											}}
											data-title={book.properties.Name.title[0].plain_text}
										/>
									) : (
										<div
											className='placeholder-cover'
											data-title={book.properties.Name.title[0].plain_text}
										>
											<p>{book.properties.Name.title[0].plain_text}</p>
										</div>
									)}
								</BookComponent>
							</Dialog.Trigger>
						))}
						<BookDialog book={chosenBook} />
					</Dialog.Root>
				</BookSlide>
			</LibraryComponent>
		</LibraryComponentWrapper>
	);
};
