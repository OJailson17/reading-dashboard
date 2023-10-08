/* eslint-disable @next/next/no-img-element */
'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Rings } from 'react-loading-icons';
import { parseCookies } from 'nookies';

import { api } from '@/lib/axios';
import { useBook } from '@/context/BookContext';
import { Book, ReadingStatus } from '@/@types/bookTypes';

import bookCoverPlaceholder from '../../../public/book-cover-placeholder.png';

import {
	DialogClose,
	DialogContent,
	DialogContentBookInfo,
	DialogContentContainer,
	DialogOverlay,
	DialogTitle,
	ReadingDialogClose,
	ReadingDialogContent,
	ReadingDialogContentContainer,
	ReadingDialogOverlay,
	ReadingDialogTitle,
} from './styles';

import 'react-toastify/dist/ReactToastify.css';

interface BookDialogProps {
	book: Book | null;
}

interface UpdateStatusProps {
	current_page?: number;
	status: 'reading' | 'finished' | 'tbr';
}

export const BookDialog = ({ book }: BookDialogProps) => {
	const [currentPage, setCurrentPage] = useState<number>(-1);
	const [showSaveButton, setShowSaveButton] = useState(false);
	const [isPageInputDisable, setIsPageInputDisable] = useState(true);
	const [readingStatus, setReadingStatus] = useState<ReadingStatus>('To read');

	const router = useRouter();

	// Books hook
	const { onGetBooks } = useBook();

	// Get token from cookies
	const { '@reading_dashboard:token': token } = parseCookies();
	// Get database id from cookies
	const { '@reading_dashboard:database_id': databaseId } = parseCookies();

	const currentPageInputRef = useRef<HTMLInputElement>(null);

	const handleAddFocusToInput = () => {
		if (currentPageInputRef.current) {
			currentPageInputRef.current.focus();
		}
	};

	const updateStatus = async ({ current_page, status }: UpdateStatusProps) => {
		try {
			await api.patch(`/book/update/status/${status}`, {
				current_page,
				page_id: book?.id,
			});

			router.refresh();
			// Update the books data
			await onGetBooks({ databaseId, token });
		} catch (error) {
			console.log(error);
			setShowSaveButton(false);
		}
	};

	// Update current page value
	const updatePages = async () => {
		// Disable input
		setIsPageInputDisable(true);

		// Redirect user to login page if token or database id does not exist
		if (!token || !databaseId) {
			toast('Error: Missing Credentials', {
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

		// Check if the page number is equal to the total number of pages
		const totalPages = book?.properties['Qtd. Pages'].number;

		// Update the status to finish
		if (totalPages && currentPage >= totalPages) {
			const newCurrentPage = totalPages;

			await updateStatus({
				status: 'finished',
				current_page: newCurrentPage,
			}).finally(() => {
				// Make save button disappear
				setShowSaveButton(false);
			});

			return;
		}

		// Disable input
		setIsPageInputDisable(true);

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

			// Set current page with the updated value
			setCurrentPage(updatedBook.properties['Current Page'].number);

			// Update the books data
			await onGetBooks({ databaseId, token });
			// revalidateTag('books');
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

	const onCloseReadingModal = async () => {
		switch (readingStatus) {
			case 'Reading':
				if (
					book?.properties.Status.select.name &&
					book?.properties.Status.select.name !== 'Reading'
				) {
					await updateStatus({
						status: 'reading',
						current_page: 0,
					});
				}
				break;

			case 'Finished':
				if (
					book?.properties.Status.select.name &&
					book?.properties.Status.select.name !== 'Finished'
				) {
					await updateStatus({
						status: 'finished',
						current_page: book?.properties['Qtd. Pages'].number || 0,
					});
				}

				break;

			case 'To read':
				if (
					book?.properties.Status.select.name &&
					book?.properties.Status.select.name !== 'To read'
				) {
					await updateStatus({
						status: 'tbr',
					});
				}
				break;

			default:
				break;
		}
	};

	// If image src is a broken link, add a image placeholder
	const handleImageError = (e: SyntheticEvent) => {
		const targetImage = e.target as HTMLImageElement;
		// targetImage.onerror = null;

		targetImage.src = bookCoverPlaceholder.src;
	};

	useEffect(() => {
		if (!isPageInputDisable) {
			setShowSaveButton(true);
			handleAddFocusToInput();
		}
	}, [isPageInputDisable]);

	// Set the current page api value to state
	useEffect(() => {
		if (book?.properties['Current Page'].number) {
			setCurrentPage(Number(book?.properties['Current Page'].number));
		}

		if (book?.properties.Status.select.name) {
			setReadingStatus(book.properties.Status.select.name);
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
						{/* Book Cover */}
						{/* If there is a book cover, show the image, if not, show the placeholder cover */}
						{book?.icon?.external?.url && (
							<img
								src={book?.icon.external.url}
								alt=''
								onErrorCapture={handleImageError}
							/>
						)}

						{!book?.icon?.external?.url && (
							<div
								className='placeholder-cover-dialog'
								data-title={book?.properties.Name.title[0].plain_text}
							>
								<p>{book?.properties.Name.title[0].plain_text}</p>
							</div>
						)}

						<DialogContentBookInfo>
							{/* Author */}
							<div>
								<span>Author:</span>
								<span>{book?.properties.Author.rich_text[0].plain_text}</span>
							</div>

							{/* Status */}
							<div>
								<span>Status:</span>
								<Dialog.Root>
									<Dialog.Trigger
										className={`status ${
											readingStatus === 'To read' ? 'tbr' : readingStatus
										}`}
									>
										{readingStatus}
									</Dialog.Trigger>

									<Dialog.Portal>
										<ReadingDialogOverlay />
										<ReadingDialogContent>
											<ReadingDialogTitle>Select Status</ReadingDialogTitle>
											<ReadingDialogContentContainer>
												<div>
													<input
														type='radio'
														id='to-read-status'
														name='status'
														value='to read'
														checked={readingStatus === 'To read'}
														onChange={() => setReadingStatus('To read')}
													/>
													<label htmlFor='to-read-status'>To Read</label>
												</div>

												<div>
													<input
														type='radio'
														id='reading-status'
														name='status'
														value='reading'
														checked={readingStatus === 'Reading'}
														onChange={() => setReadingStatus('Reading')}
													/>
													<label htmlFor='reading-status'>Reading</label>
												</div>

												<div>
													<input
														type='radio'
														id='finished-status'
														name='status'
														value='finished'
														checked={readingStatus === 'Finished'}
														onChange={() => setReadingStatus('Finished')}
													/>
													<label htmlFor='finished-status'>Finished</label>
												</div>
											</ReadingDialogContentContainer>
											<ReadingDialogClose onClick={onCloseReadingModal}>
												Save & Close
											</ReadingDialogClose>
										</ReadingDialogContent>
									</Dialog.Portal>
								</Dialog.Root>
							</div>

							{/* Pages */}
							<div>
								<span>Pages:</span>
								<span>{book?.properties['Qtd. Pages'].number}</span>
							</div>

							{/* Rating */}
							{/* Show the rating if the book status is Finished */}
							{readingStatus === 'Finished' && (
								<div>
									<span>Rating:</span>
									<span>{book?.properties.Rating.select?.name}</span>
								</div>
							)}

							{/* Current Page */}
							{readingStatus === 'Reading' && (
								<div>
									<span>Current Page:</span>

									{/* If the state value is less than 0, show default value */}
									<input
										type='number'
										value={
											currentPage < 0
												? book?.properties['Current Page'].number || 0
												: currentPage
										}
										onChange={e => setCurrentPage(Number(e.target.value))}
										disabled={isPageInputDisable}
										ref={currentPageInputRef}
									/>

									{/* Show save or edit button depending on the showSaveButton state */}
									{!showSaveButton && (
										<button
											className='book-btn'
											onClick={() => {
												setIsPageInputDisable(false);
											}}
										>
											Edit
										</button>
									)}

									{showSaveButton && (
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
									)}
								</div>
							)}

							{/* Goodreads review */}
							<div
								style={{
									display: readingStatus !== 'To read' ? 'none' : 'block',
								}}
							>
								<span>Goodreads:</span>{' '}
								<span>{book?.properties?.Goodreads?.select?.name}</span>
							</div>
						</DialogContentBookInfo>
					</DialogContentContainer>
					<DialogClose onClick={onCloseModal}>Save & Close</DialogClose>
				</DialogContent>
			</Dialog.Portal>
		</>
	);
};
