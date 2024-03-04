'use client';

import Image from 'next/image';
import { DrawerContent, DrawerHeader } from '../ui/drawer';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { BookDialog } from '../BookDialog';
import { useRef, useState } from 'react';
import { updateBook } from '@/app/actions/updateBook';
import { Book, BookStatus } from '@/@types/book';
import { handleFormatDate } from '@/utils/formatDate';
import { ImSpinner2 } from 'react-icons/im';

interface UpdateReadingDialog {
	book: Book;
}

export const UpdateReadingDialog = ({ book }: UpdateReadingDialog) => {
	const [currentPageValue, setCurrentPageValue] = useState('');
	const [bookStatus, setBookStatus] = useState(book.status);
	const [isUpdatingBook, setIsUpdatingBook] = useState(false);

	const pageInputRef = useRef<HTMLInputElement | null>(null);

	// Update book status and current page
	const handleUpdateBook = async () => {
		// just return if page and status didn't change
		if (
			Number(currentPageValue) === book.current_page &&
			bookStatus === book.status
		) {
			return;
		}

		setIsUpdatingBook(true);

		if (bookStatus === 'To read') {
			book.started_date = null;
			book.finished_date = null;
			book.current_page = 0;
		}

		// define as finished if status is finished or current page is more than total pages
		if (
			bookStatus === 'Finished' ||
			Number(currentPageValue) >= book.total_pages
		) {
			book.finished_date = handleFormatDate(new Date(), 'utc');
			book.started_date = !book.started_date
				? handleFormatDate(new Date(), 'utc')
				: book.started_date;
			book.current_page = book.total_pages;
		}

		if (Number(currentPageValue) >= book.total_pages) {
			return updateBook({
				...book,
				status: 'Finished',
			});
		}

		await updateBook({
			...book,
			current_page: Number(currentPageValue) || book.current_page,
			status: bookStatus,
		});

		pageInputRef.current?.blur();
		setIsUpdatingBook(false);
	};

	return (
		<DrawerContent
			onInteractOutside={() => setCurrentPageValue('')}
			className='bg-secondary-background border-none outline-none'
		>
			<DrawerHeader className='w-full h-ful relative'>
				<div className='w-28 absolute h-40 -top-20 left-1/2 -translate-x-1/2 rounded-2xl'>
					<Image
						src={book.cover_url}
						alt='book cover'
						fill
						className='object-contain rounded-2xl'
						priority
					/>
				</div>
				<div className='mt-20 flex items-center justify-center gap-4'>
					<span className='font-light text-span'>{book.total_pages} p</span>
					<Dialog>
						<DialogTrigger className='text-blue font-light cursor-pointer'>
							details
						</DialogTrigger>
						<BookDialog book={book} />
					</Dialog>
				</div>
			</DrawerHeader>

			<form
				className='mt-4 mb-6 flex flex-col gap-6 items-center justify-center'
				autoComplete='off'
				action={handleUpdateBook}
			>
				<div className='flex flex-col gap-1 justify-center text-span'>
					<label htmlFor='current-page'>current page:</label>
					<input
						type='text'
						placeholder={String(book.current_page)}
						className='bg-background w-60 h-9 rounded-md px-4'
						value={currentPageValue}
						onChange={e => setCurrentPageValue(e.target.value)}
						ref={pageInputRef}
					/>
				</div>
				<div className='flex flex-col gap-1 justify-center text-span'>
					<label htmlFor='current-page'>status:</label>
					<Select
						defaultValue={book.status}
						onValueChange={(status: BookStatus) => setBookStatus(status)}
					>
						<SelectTrigger className='w-60'>
							<SelectValue placeholder='Select status' />
						</SelectTrigger>

						<SelectContent className='bg-background'>
							<SelectGroup className='bg-background text-span'>
								{/* <SelectLabel>Status</SelectLabel> */}
								<SelectItem value='To read'>To read</SelectItem>
								<SelectItem value='Reading'>Reading</SelectItem>
								<SelectItem value='Finished'>Finished</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<button
					className='w-60 h-9 bg-purple rounded-md font-medium text-sm flex items-center justify-center'
					disabled={isUpdatingBook}
				>
					{isUpdatingBook ? (
						<ImSpinner2 className='text-white animate-spin' />
					) : (
						<p>save</p>
					)}
				</button>
			</form>
		</DrawerContent>
	);
};
