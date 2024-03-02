'use client';

import Image from 'next/image';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { IoMdCalendar, IoMdCheckbox } from 'react-icons/io';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type BookStatus = 'to read' | 'reading' | 'finished';

interface Book {
	title: string;
	author: string;
	total_pages: number;
	status: string;
	cover_url: string;
}

interface BookDialogProps {
	type?: 'tbr' | 'finished';
	book: Book;
}

interface HandleDateProps {
	date: Date;
	date_type: 'started' | 'finished';
}

const bookStatusColor = {
	'to read': 'border-placeholder',
	reading: 'border-yellow-500',
	finished: 'border-light-green',
};

export const BookDialog = ({ type = 'tbr', book }: BookDialogProps) => {
	const [startedDate, setStartedDate] = useState<Date>();
	const [finishedDate, setFinishedDate] = useState<Date>();
	const [bookStatus, setBookStatus] = useState<BookStatus>('to read');

	const handleSetDate = ({ date, date_type }: HandleDateProps) => {
		if (date_type === 'started') {
			return setStartedDate(date);
		}

		setFinishedDate(date);
	};

	const handleFormatDate = (date: Date) => {
		return format(date, 'dd/MM/yyy', {
			locale: ptBR,
		});
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

			{type === 'finished' && (
				<div className='w-full flex items-center justify-center gap-7 mt-3'>
					<Popover>
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
									handleSetDate({ date: e || new Date(), date_type: 'started' })
								}
								disabled={date =>
									date > new Date() || date < new Date('1900-01-01')
								}
								className='bg-secondary-background border-none text-span '
							/>
						</PopoverContent>
					</Popover>

					<Popover>
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
								disabled={date =>
									date > new Date() || date < new Date('1900-01-01')
								}
								className='bg-secondary-background border-none text-span outline-none'
							/>
						</PopoverContent>
					</Popover>
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
				<div className='space-x-3'>
					<p className='inline-block'>Status:</p>
					<Popover>
						<PopoverTrigger
							className={`font-light text-span ${bookStatusColor[bookStatus]} border-[1px] px-2 rounded-md`}
						>
							{bookStatus.toUpperCase()}
						</PopoverTrigger>
						<PopoverContent
							// onInteractOutside={() => console.log('closed')}
							className='w-80 flex items-center justify-center gap-5 bg-secondary-background'
						>
							<div className='flex items-center justify-center gap-2 cursor-pointer'>
								<input
									type='radio'
									id='to-read-status'
									name='status'
									value='to read'
									checked={bookStatus === 'to read'}
									onChange={() => setBookStatus('to read')}
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
									value='reading'
									checked={bookStatus === 'reading'}
									onChange={() => setBookStatus('reading')}
								/>
								<label htmlFor='reading-status' className='text-sm text-span'>
									Reading
								</label>
							</div>
							<div className='flex items-center justify-center gap-2 cursor-pointer'>
								<input
									type='radio'
									id='finished-status'
									name='status'
									value='finished'
									checked={bookStatus === 'finished'}
									onChange={() => setBookStatus('finished')}
								/>
								<label htmlFor='finished-status' className='text-sm text-span'>
									Finished
								</label>
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div className='space-x-3'>
					{type === 'tbr' && <p className='inline-block'>Goodreads:</p>}
					{type === 'finished' && <p className='inline-block'>Review:</p>}
					<span className='font-light text-span'>⭐⭐⭐⭐</span>
				</div>
			</div>
		</DialogContent>
	);
};
