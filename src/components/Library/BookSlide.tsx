'use client';

import * as Dialog from '@radix-ui/react-dialog';
import React, { SyntheticEvent, useEffect, useState } from 'react';

import { BookDialog } from '../BookDialog';

import { Book } from '@/@types/bookTypes';

import bookCoverPlaceholder from '../../../public/book-cover-placeholder.png';

import { BookComponent } from './styles';
interface BookSlideComponentProps {
	books: Book[];
}

export const BookSlideComponent = ({ books }: BookSlideComponentProps) => {
	const [chosenBook, setChosenBook] = useState<Book | null>(null);
	const [imagesSrc, setImagesSrc] = useState<string[]>([]);

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

	// Image error handling to add a placeholder image if link is broken
	useEffect(() => {
		const loadImages = async () => {
			let loadedImage: string[] = [];

			for (const book of books) {
				const img = new Image();
				img.src = book.icon ? book.icon.external.url : '';

				await new Promise((resolve, reject) => {
					img.onload = resolve;
					img.onerror = reject;
				}).catch(() => {
					// Image failed to load, push fallback URL to the loaded images array
					loadedImage.push(bookCoverPlaceholder.src);
				});

				if (img.complete && img.naturalHeight !== 0) {
					// Image loaded successfully, push the original URL to the loaded images array
					loadedImage.push(book.icon.external.url);
				}
			}

			setImagesSrc(loadedImage);
		};

		loadImages();
	}, [books]);

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
							<img
								src={imagesSrc[i]}
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
