'use client';

import * as Dialog from '@radix-ui/react-dialog';
import React, { SyntheticEvent, useState } from 'react';

import { BookDialog } from '../BookDialog';

import { Book } from '@/types/bookTypes';

import { BookComponent } from './styles';
interface BookSlideComponentProps {
	books: Book[];
}

export const BookSlideComponent = ({ books }: BookSlideComponentProps) => {
	const [chosenBook, setChosenBook] = useState<Book | null>(null);

	// Get the clicked book and set to the chosen book state
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
		<Dialog.Root>
			{books.map(book => (
				<Dialog.Trigger
					key={book.id}
					onClick={e => handleChoseBook(e)}
					style={{ border: 'none', borderRadius: '10px' }}
					asChild
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
	);
};
