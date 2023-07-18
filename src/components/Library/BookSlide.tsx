'use client';

import * as Dialog from '@radix-ui/react-dialog';
import React, { SyntheticEvent, useEffect, useState } from 'react';

import { BookDialog } from '../BookDialog';

import { Book } from '@/@types/bookTypes';

import bookCoverPlaceholder from '../../../public/book-cover-placeholder.png';

import { BookComponent } from './styles';
import Image, { ImageProps as NextImage } from 'next/image';
interface BookSlideComponentProps {
	books: Book[];
}

interface ImageSrcProps {
	index: number;
	url: string;
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

	// Update the image source to a fallback URL when the image fails to load
	const handleImageError = (e: SyntheticEvent) => {
		const image = e.target as HTMLImageElement;

		image.src = bookCoverPlaceholder.src;
	};

	return (
		<Dialog.Root>
			{books.map((book, i) => (
				<Dialog.Trigger
					key={book.id}
					onClick={e => {
						handleChoseBook(e);
					}}
					style={{ border: 'none', borderRadius: '10px' }}
					asChild
				>
					<BookComponent>
						{book.icon?.external?.url ? (
							/* eslint-disable-next-line @next/next/no-img-element */
							<Image
								src={book.icon?.external?.url}
								alt=''
								style={{
									borderRadius: '10px',
								}}
								data-title={book.properties.Name.title[0].plain_text}
								onErrorCapture={e => handleImageError(e)}
								unoptimized
								width={150}
								height={214}
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
