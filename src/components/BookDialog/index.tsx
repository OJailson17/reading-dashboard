/* eslint-disable @next/next/no-img-element */
'use client';

import { useBook } from '@/context/BookContext';
import { api } from '@/lib/axios';
import * as Dialog from '@radix-ui/react-dialog';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { Rings } from 'react-loading-icons';

import {
	DialogClose,
	DialogContent,
	DialogContentBookInfo,
	DialogContentContainer,
	DialogOverlay,
	DialogTitle,
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

interface BookDialogProps {
	book: Book | null;
}

export const BookDialog = ({ book }: BookDialogProps) => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [showSaveButton, setShowSaveButton] = useState(false);
	const [isPageInputDisable, setIsPageInputDisable] = useState(true);

	// Get token from cookies
	const { '@reading_dashboard:token': token } = parseCookies();
	// Get database id from cookies
	const { '@reading_dashboard:database_id': databaseId } = parseCookies();

	// Books hook
	const { onGetBooks } = useBook();

	const updatePages = async () => {
		// Disable input
		setIsPageInputDisable(true);

		try {
			const response = await api.patch('/book/update', {
				current_page: currentPage,
				page_id: book?.id,
			});

			// Add type to the response result data
			const updatedBook = response.data as Book;

			// Set current page to the updated value
			setCurrentPage(updatedBook.properties['Current Page'].number);

			// Update the books data
			await onGetBooks({ databaseId, token });

			// Make save button disappear
			setShowSaveButton(false);
		} catch (error) {
			console.log(error);
		}
	};

	// Show save button if
	useEffect(() => {
		if (!isPageInputDisable) {
			setShowSaveButton(true);
		}
	}, [isPageInputDisable]);

	return (
		<Dialog.Portal>
			<DialogOverlay />

			<DialogContent>
				<DialogTitle>{book?.properties.Name.title[0].plain_text}</DialogTitle>
				<DialogContentContainer>
					{/* If there is a book cover, show the image, if not, show the placeholder cover */}
					{book?.icon?.external?.url ? (
						<img src={book?.icon.external.url} alt='' />
					) : (
						<div
							className='placeholder-cover-dialog'
							data-title={book?.properties.Name.title[0].plain_text}
						>
							<p>{book?.properties.Name.title[0].plain_text}</p>
						</div>
					)}
					<DialogContentBookInfo>
						<div>
							<span>Author:</span>
							<span>{book?.properties.Author.rich_text[0].plain_text}</span>
						</div>
						<div>
							<span>Status:</span>
							<span className={book?.properties.Status.select.name}>
								{book?.properties.Status.select.name}
							</span>
						</div>
						<div>
							<span>Pages:</span>
							<span>{book?.properties['Qtd. Pages'].number}</span>
						</div>
						{/* Show the rating ig the book status is Finished */}
						{book?.properties.Status.select.name === 'Finished' ? (
							<div>
								<span>Rating</span>
								<span>{book?.properties.Rating.select.name}</span>
							</div>
						) : (
							<div>
								<span>Current Page:</span>
								<input
									type='number'
									value={currentPage || book?.properties['Current Page'].number}
									onChange={e => setCurrentPage(Number(e.target.value))}
									disabled={isPageInputDisable}
								/>

								{showSaveButton ? (
									<button
										className='book-btn'
										onClick={() => updatePages()}
										disabled={isPageInputDisable}
									>
										{isPageInputDisable ? (
											<Rings width={16} height={16} />
										) : (
											<p>Save</p>
										)}
									</button>
								) : (
									<button
										className='book-btn'
										onClick={() => {
											setIsPageInputDisable(false);
										}}
									>
										Edit
									</button>
								)}
							</div>
						)}
					</DialogContentBookInfo>
				</DialogContentContainer>
				<DialogClose onClick={() => setCurrentPage(0)}>Close</DialogClose>
			</DialogContent>
		</Dialog.Portal>
	);
};
