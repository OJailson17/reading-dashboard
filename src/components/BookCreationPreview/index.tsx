'use client';

import { useMultiForm } from '@/context/MultiFormContext';
import { handleFormatCoverURL } from '@/utils/formatCoverUrl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const bookStatusColor = {
	'To read': 'border-placeholder',
	Reading: 'border-yellow-500',
	Finished: 'border-light-green',
};

export const BookCreationPreview = () => {
	const { formData } = useMultiForm();

	const [book, setBook] = useState(formData);

	useEffect(() => {
		if (formData.cover_url) {
			formData.cover_url = handleFormatCoverURL(formData.cover_url || '');
		}

		setBook(formData);
	}, [formData]);

	return (
		<div className='bg-secondary-background w-full min-h-80 max-w-96 sm:max-lg:w-80 rounded-2xl px-2 py-4 flex flex-col items-center justify-center gap-2'>
			{/* Cover */}
			<div className='w-28 h-40 bg-background rounded-md text-center flex items-center justify-center'>
				{book.cover_url && book.cover_url !== '' ? (
					<div className='w-full h-full relative'>
						<Image
							src={book.cover_url || ''}
							alt={'Book Cover'}
							fill
							priority
							className='object-cover rounded-md'
						/>
					</div>
				) : (
					<p className='text-xs'>{book.title}</p>
				)}
			</div>

			{/* Title */}
			{book.title ? (
				<p className='max-w-52 break-words ellipsis-title text-center font-medium'>
					{book.title}
				</p>
			) : (
				<div className='bg-background w-full max-w-52 h-6 rounded-md' />
			)}

			{/* Author */}
			{book.author ? (
				<p className='max-w-52 break-words ellipsis-title text-center text-span'>
					{book.author}
				</p>
			) : (
				<div className='bg-background w-full max-w-36 h-6 rounded-md' />
			)}

			{/* Status/Rating */}
			<div className='w-full max-w-52 flex items-center justify-center gap-2'>
				{book.status ? (
					<div
						className={`font-light max-h-6 text-white border-[1.5px] ${
							bookStatusColor[book.status]
						} w-[90%] mx-auto max-w-40 px-2 rounded-md text-center text-sm py-3 flex items-center justify-center`}
					>
						{book.status}
					</div>
				) : (
					<div className='bg-background w-full h-6 rounded-md' />
				)}

				{/* Totaç pages */}
				{book.total_pages ? (
					<div className='w-20 h-6 flex items-center justify-center gap-1'>
						<p className='font-light text-span'>{book.total_pages} p</p>
					</div>
				) : (
					<div className='bg-background w-16 h-6 rounded-md' />
				)}
			</div>
		</div>
	);
};
