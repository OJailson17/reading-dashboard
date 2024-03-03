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
import { BookDialog, BookStatus } from '../BookDialog';
import { useState } from 'react';
import { updateBook } from '@/app/actions/updateBook';

interface Book {
	id: string;
	title: string;
	author: string;
	total_pages: number;
	current_page: number;
	cover_url: string;
	status: BookStatus;
}

interface UpdateReadingDialog {
	book: Book;
}

export const UpdateReadingDialog = ({ book }: UpdateReadingDialog) => {
	const [currentPageValue, setCurrentPageValue] = useState('');
	const [bookStatus, setBookStatus] = useState(book.status);

	const fetchData = async () => {
		setCurrentPageValue('');

		if (bookStatus === 'Finished') {
			return updateBook({
				...book,
				current_page: book.total_pages,
				status: bookStatus,
			});
		}

		updateBook({
			...book,
			current_page: Number(currentPageValue) || book.current_page,
			status: bookStatus,
		});
	};

	return (
		<DrawerContent className='bg-secondary-background border-none'>
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
				action={fetchData}
			>
				<div className='flex flex-col gap-1 justify-center text-span'>
					<label htmlFor='current-page'>current page:</label>
					<input
						type='text'
						placeholder={String(book.current_page)}
						className='bg-background w-60 h-9 rounded-md px-4'
						value={currentPageValue}
						onChange={e => setCurrentPageValue(e.target.value)}
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

				<button className='w-60 h-9 bg-purple rounded-md font-medium text-sm'>
					Save
				</button>
			</form>
		</DrawerContent>
	);
};
