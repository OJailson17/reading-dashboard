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
import { useToast } from '../ui/use-toast';
import { updateBookStatus } from '@/app/actions/updateBookStatus';
import { updateBookPage } from '@/app/actions/updateBookPage';
import { Controller, useForm } from 'react-hook-form';

interface UpdateReadingDialog {
	book: Book;
}

interface UpdateReadingForm {
	current_page: number;
	status: BookStatus;
}

export const UpdateReadingDialog = ({ book }: UpdateReadingDialog) => {
	// const [bookStatus, setBookStatus] = useState(book.status);

	const {
		register,
		handleSubmit,
		control,
		resetField,
		formState: { isSubmitting },
	} = useForm<UpdateReadingForm>();

	const { toast } = useToast();

	// Update book status and current page
	const handleUpdateBook = async ({
		current_page,
		status,
	}: UpdateReadingForm) => {
		// just return if page and status didn't change
		if (current_page === book.current_page && status === book.status) {
			return;
		}

		const activeElement = document.activeElement as HTMLInputElement;
		activeElement.blur();

		if (status === 'To read') {
			return await updateBookStatus({
				status: 'To read',
				book,
			});
		}

		// define as finished if status is finished or current page is more than total pages
		if (status === 'Finished' || current_page >= book.total_pages) {
			return await updateBookStatus({
				status: 'Finished',
				book: {
					...book,
					current_page: book.total_pages,
				},
			});
		}

		await updateBookPage({
			book_id: book.id,
			current_page: current_page || book.current_page,
		});

		toast({
			description: 'Book updated!',
			variant: 'success',
		});

		resetField('current_page');
	};

	return (
		<DrawerContent
			onInteractOutside={() => resetField('current_page')}
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
				onSubmit={handleSubmit(handleUpdateBook)}
			>
				<div className='flex flex-col gap-1 justify-center text-span'>
					<label htmlFor='current-page'>current page:</label>
					<input
						type='number'
						placeholder={String(book.current_page)}
						className='bg-background w-60 h-9 max-sm:h-11 max-sm:w-72 rounded-md px-4'
						// value={currentPageValue}
						// max={book.total_pages}
						min={0}
						// onChange={e => setCurrentPageValue(e.target.value)}
						{...register('current_page', {
							valueAsNumber: true,
						})}
					/>
				</div>
				<div className='flex flex-col gap-1 justify-center text-span'>
					<label htmlFor='current-page'>status:</label>
					<Controller
						name='status'
						control={control}
						defaultValue={book.status}
						render={({ field: { ref, ...rest } }) => (
							<Select onValueChange={rest.onChange} {...rest}>
								<SelectTrigger className='w-60 max-sm:h-11 max-sm:w-72'>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>

								<SelectContent className='bg-background'>
									<SelectGroup className='bg-background text-span'>
										{/* <SelectLabel>Status</SelectLabel> */}
										<SelectItem value='To read' className='max-sm:h-11'>
											To read
										</SelectItem>
										<SelectItem value='Reading' className='max-sm:h-11'>
											Reading
										</SelectItem>
										<SelectItem value='Finished' className='max-sm:h-11'>
											Finished
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				<button
					className='w-60 h-9 max-sm:h-11 max-sm:w-72 bg-purple rounded-md font-medium text-sm flex items-center justify-center'
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<ImSpinner2 className='text-white animate-spin' />
					) : (
						<p>save</p>
					)}
				</button>
			</form>
		</DrawerContent>
	);
};
