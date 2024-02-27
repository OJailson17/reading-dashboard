'use client';

import Image from 'next/image';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { IoMdCalendar, IoMdCheckbox } from 'react-icons/io';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BookDialogProps {
	type?: 'tbr' | 'finished';
}

interface HandleDateProps {
	date: Date;
	date_type: 'started' | 'finished';
}

export const BookDialog = ({ type = 'tbr' }: BookDialogProps) => {
	const [startedDate, setStartedDate] = useState<Date>();
	const [finishedDate, setFinishedDate] = useState<Date>();

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
		<DialogContent className='bg-background max-w-[450px] rounded-3xl border-none px-9 py-6 flex items-center justify-center flex-col'>
			<DialogTitle className='text-center font-semibold text-lg mt-5'>
				Fluent Forever
			</DialogTitle>

			<div className='w-full max-w-28 h-40 rounded-md p-1.5 mt-4 bg-purple'>
				<div className='h-full relative'>
					<Image
						src={
							'https://m.media-amazon.com/images/I/51M9IbBqxCL._AC_UF1000,1000_QL80_.jpg'
						}
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
					<span className='font-light text-span'>Gabriel Wyner</span>
				</div>
				<div className='space-x-3'>
					<p className='inline-block'>Pages:</p>
					<span className='font-light text-span'>300</span>
				</div>
				<div className='space-x-3'>
					<p className='inline-block'>Status:</p>
					<button className='font-light text-span border-green-500 border-[1px] px-2 rounded-md'>
						Finished
					</button>
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
