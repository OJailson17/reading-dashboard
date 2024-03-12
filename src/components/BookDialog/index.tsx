'use client';

import Image from 'next/image';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { IoMdCalendar, IoMdCheckbox } from 'react-icons/io';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { Book, BookStatus } from '@/@types/book';
import { handleFormatDate, handleRemoveZeroDigit } from '@/utils/formatDate';
import { useToast } from '../ui/use-toast';
import { updateBookStatus } from '@/app/actions/updateBookStatus';
import { ImSpinner2 } from 'react-icons/im';
import { updateBookDates } from '@/app/actions/updateBookDates';

interface BookDialogProps {
	type: BookStatus;
	book: Book;
}

interface HandleDateProps {
	date: Date;
	date_type: 'started' | 'finished';
}

const bookStatusColor = {
	'To read': 'border-placeholder',
	Reading: 'border-yellow-500',
	Finished: 'border-light-green',
};

const today = format(new Date(), 'yyyy-MM-dd');

export const BookDialog = ({ type = 'To read', book }: BookDialogProps) => {
	const [startedDate, setStartedDate] = useState<Date>(
		new Date(handleRemoveZeroDigit(book.started_date || today)),
	);
	const [finishedDate, setFinishedDate] = useState<Date>(
		new Date(handleRemoveZeroDigit(book.finished_date || today)),
	);
	const [bookStatus, setBookStatus] = useState<BookStatus>(book.status);
	const [isBookStatusUpdating, setIsBookStatusUpdating] = useState(false);
	const [isDateUpdating, setIsDateUpdating] = useState(false);

	const { toast } = useToast();

	const handleSetDate = ({ date, date_type }: HandleDateProps) => {
		if (date_type === 'started') {
			return setStartedDate(date);
		}

		setFinishedDate(date);
	};

	const handleUpdateStatus = async (isStatusModalOpen: boolean) => {
		if (!isStatusModalOpen && bookStatus !== book.status) {
			setIsBookStatusUpdating(true);

			// if it's reading set started date to today
			if (bookStatus === 'To read') {
				await updateBookStatus({
					status: 'To read',
					book,
				});
			}

			// if it's reading set started date to today
			if (bookStatus === 'Reading') {
				await updateBookStatus({
					status: 'Reading',
					book,
				});
			}

			// if it's Finished set Finished date to today
			if (bookStatus === 'Finished') {
				await updateBookStatus({
					status: 'Finished',
					book: {
						...book,
						current_page: book.total_pages,
					},
				});
			}

			toast({
				description: 'Book updated!',
				variant: 'success',
			});
			setIsBookStatusUpdating(false);
		}
	};

	const handleUpdateDates = async (isDatePickerOpen: boolean) => {
		// update the date if date picker is closed and a different date was chosen
		if (!isDatePickerOpen) {
			if (
				handleFormatDate(startedDate) !==
					handleFormatDate(new Date(book.started_date || today)) ||
				handleFormatDate(finishedDate) !==
					handleFormatDate(new Date(book.finished_date || today))
			) {
				setIsDateUpdating(true);

				await updateBookDates({
					book_id: book.id,
					started_date: handleFormatDate(startedDate, 'utc'),
					finished_date: handleFormatDate(finishedDate, 'utc'),
				});

				setIsDateUpdating(false);

				toast({
					description: 'Book updated!',
					variant: 'success',
				});
			}
		}
	};

	return (
		<DialogContent className='bg-background w-[90%] max-w-[450px] rounded-3xl border-none xs:px-6 px-9 py-6 flex items-center justify-center flex-col'>
			<DialogTitle className='text-center font-semibold text-lg mt-5'>
				{book.title}
			</DialogTitle>

			<div className='w-full max-w-28 h-40 rounded-md p-1.5 mt-4 bg-purple'>
				<div className='h-full relative'>
					<Image
						src={book.cover_url}
						alt='book cover'
						fill
						className='object-contain'
					/>
				</div>
			</div>

			{type === 'Finished' && (
				<div className='w-full flex items-center justify-center gap-7 mt-3 relative'>
					<Popover onOpenChange={handleUpdateDates}>
						<PopoverTrigger className='flex items-center justify-center gap-2'>
							<IoMdCalendar size={18} />
							<span className='font-light text-sm text-span'>
								{startedDate
									? handleFormatDate(startedDate)
									: handleFormatDate(new Date())}
							</span>
						</PopoverTrigger>

						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								selected={startedDate}
								onSelect={e =>
									handleSetDate({
										date: e || new Date(book.started_date || today),
										date_type: 'started',
									})
								}
								disabled={date =>
									date > new Date() || date < new Date('1900-01-01')
								}
								defaultMonth={new Date(book.started_date || today)}
								className='bg-secondary-background border-none text-span '
							/>
						</PopoverContent>
					</Popover>

					<Popover onOpenChange={handleUpdateDates}>
						<PopoverTrigger className='flex items-center justify-center gap-2'>
							<IoMdCheckbox size={18} />
							<span className='font-light text-sm text-span'>
								{finishedDate
									? handleFormatDate(finishedDate)
									: handleFormatDate(new Date())}
							</span>
						</PopoverTrigger>

						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								selected={finishedDate}
								onSelect={e =>
									handleSetDate({
										date: e || new Date(),
										date_type: 'finished',
									})
								}
								defaultMonth={new Date(book.finished_date || today)}
								disabled={date =>
									date > new Date() || date < new Date('1900-01-01')
								}
								className='bg-secondary-background border-none text-span outline-none'
							/>
						</PopoverContent>
					</Popover>

					{isDateUpdating && (
						<ImSpinner2 className='animate-spin absolute right-1' />
					)}
				</div>
			)}

			<div className='w-full flex flex-col mt-4 space-y-3'>
				<div className='space-x-3'>
					<p className='inline-block'>Author:</p>
					<span className='font-light text-span'>{book.author}</span>
				</div>
				<div className='space-x-3'>
					<p className='inline-block'>Pages:</p>
					<span className='font-light text-span'>{book.total_pages}</span>
				</div>
				<div className='space-x-3 flex items-center'>
					<p className='inline-block'>Status:</p>
					<Popover onOpenChange={handleUpdateStatus}>
						<PopoverTrigger
							className={`font-light text-span ${bookStatusColor[bookStatus]} border-[1px] px-2 rounded-md min-w-20 min-h-6 text-center flex items-center justify-center`}
						>
							{isBookStatusUpdating ? (
								<ImSpinner2 className='animate-spin' />
							) : (
								bookStatus.toUpperCase()
							)}
						</PopoverTrigger>
						<PopoverContent
							// onInteractOutside={handleUpdateStatus}
							className='w-80 flex items-center justify-center gap-5 bg-secondary-background'
						>
							<div className='flex items-center justify-center gap-2 cursor-pointer'>
								<input
									type='radio'
									id='to-read-status'
									name='status'
									value='To read'
									checked={bookStatus === 'To read'}
									onChange={() => setBookStatus('To read')}
								/>
								<label htmlFor='to-read-status' className='text-sm text-span'>
									To Read
								</label>
							</div>
							<div className='flex items-center justify-center gap-2 cursor-pointer'>
								<input
									type='radio'
									id='reading-status'
									name='status'
									value='Reading'
									checked={bookStatus === 'Reading'}
									onChange={() => setBookStatus('Reading')}
								/>
								<label htmlFor='reading-status' className='text-sm text-span'>
									Reading
								</label>
							</div>
							<div className='flex items-center justify-center gap-2 cursor-pointer'>
								<input
									type='radio'
									id='Finished-status'
									name='status'
									value='Finished'
									checked={bookStatus === 'Finished'}
									onChange={() => setBookStatus('Finished')}
								/>
								<label htmlFor='Finished-status' className='text-sm text-span'>
									Finished
								</label>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div className='space-x-3'>
					{type === 'To read' || type === 'Reading' ? (
						<>
							<p className='inline-block'>Goodreads:</p>
							<span className='font-light text-span'>{book?.goodreads}</span>
						</>
					) : (
						<>
							<p className='inline-block'>Review:</p>
							<span className='font-light text-span'>{book?.review}</span>
						</>
					)}
				</div>
			</div>
		</DialogContent>
	);
};
