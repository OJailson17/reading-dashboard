/* eslint-disable @next/next/no-img-element */
'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Rings } from 'react-loading-icons';
import { parseCookies } from 'nookies';

import { api } from '@/lib/axios';
import { useBook } from '@/context/BookContext';
import { Book } from '@/types/bookTypes';

import {
	DialogClose,
	DialogContent,
	DialogContentBookInfo,
	DialogContentContainer,
	DialogOverlay,
	DialogTitle,
} from './styles';

import 'react-toastify/dist/ReactToastify.css';

interface BookDialogProps {
	book: Book | null;
}

export const BookDialog = ({ book }: BookDialogProps) => {
	const [currentPage, setCurrentPage] = useState<number>(-1);
	const [showSaveButton, setShowSaveButton] = useState(false);
	const [isPageInputDisable, setIsPageInputDisable] = useState(true);

	const router = useRouter();

	// Get token from cookies
	const { '@reading_dashboard:token': token } = parseCookies();
	// Get database id from cookies
	const { '@reading_dashboard:database_id': databaseId } = parseCookies();

	// Books hook
	const { onGetBooks } = useBook();

	// Update current page value
	const updatePages = async () => {
		// Disable input
		setIsPageInputDisable(true);

		// Check if the page number is equal to the total number of pages
		const totalPages = book?.properties['Qtd. Pages'].number;

		if (currentPage === totalPages) {
			try {
				await api
					.patch('/book/update/status/finished', {
						current_page: currentPage,
						page_id: book?.id,
					})
					.finally(() => {
						// Make save button disappear
						setShowSaveButton(false);
					});

				// Update the books data
				await onGetBooks({ databaseId, token });
			} catch (error) {
				console.log(error);
				setShowSaveButton(false);
			}

			return;
		}

		// Disable input
		setIsPageInputDisable(true);

		// Redirect user to login page if token or database id does not exist
		if (!token || !databaseId) {
			toast('Error', {
				position: 'top-center',
				autoClose: 2000,
				theme: 'dark',
				type: 'error',
			});

			setTimeout(() => {
				router.push('/login');
			}, 2500);

			return;
		}

		try {
			// Make the api call to passing the new value
			const response = await api
				.patch('/book/update/page', {
					current_page: currentPage,
					page_id: book?.id,
				})
				.finally(() => {
					// Make save button disappear
					setShowSaveButton(false);
				});

			// Add type to the response result data
			const updatedBook = response.data as Book;

			// Set current page to the updated value
			setCurrentPage(updatedBook.properties['Current Page'].number);

			// Update the books data
			await onGetBooks({ databaseId, token });
			// revalidateTag('books');

			// Make save button disappear
			// setShowSaveButton(false);
		} catch (error) {
			console.log(error);
			setShowSaveButton(false);
		}
	};

	// Reset states after close modal
	const onCloseModal = () => {
		setCurrentPage(-1);
		setShowSaveButton(false);
		setIsPageInputDisable(true);
	};

	// Show save button if
	useEffect(() => {
		if (!isPageInputDisable) {
			setShowSaveButton(true);
		}
	}, [isPageInputDisable]);

	// Set the current page api value to state
	useEffect(() => {
		if (book?.properties['Current Page'].number) {
			setCurrentPage(Number(book?.properties['Current Page'].number));
		}
	}, [book]);

	return (
		<>
			<ToastContainer />
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
								<span
									className={`status ${
										book?.properties.Status.select.name === 'To read'
											? 'tbr'
											: book?.properties.Status.select.name
									}`}
								>
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
								book?.properties.Status.select.name !== 'To read' && (
									<div>
										<span>Current Page:</span>

										{/* If the state value is less than 0, show default value */}

										<input
											type='number'
											value={
												currentPage < 0
													? book?.properties['Current Page'].number
													: currentPage
											}
											onChange={e => setCurrentPage(Number(e.target.value))}
											disabled={isPageInputDisable}
										/>

										{/* Show save or edit button depending on the showSaveButton state */}
										{showSaveButton ? (
											<button
												className='book-btn'
												onClick={updatePages}
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
								)
							)}
						</DialogContentBookInfo>
					</DialogContentContainer>
					<DialogClose onClick={onCloseModal}>Close</DialogClose>
				</DialogContent>
			</Dialog.Portal>
		</>
	);
};
