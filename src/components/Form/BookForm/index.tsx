/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { api } from '@/lib/axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { Select as AntdSelect, DatePicker, Radio } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { CreateBookForm } from './styles';
import { Rings } from 'react-loading-icons';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { formatBookData } from '@/helpers/formatBookData';
import { InputComponent } from './InputComponent';
import { bookSchema } from './bookSchema';

export type CreateBook = yup.InferType<typeof bookSchema>;

interface BookFormProps {
	database_id: string;
}

interface GetBookDatesProps {
	startedDate: string | null;
	finishedDate: string | null;
}

const genreOptions = [
	{
		label: 'Fiction',
		value: 'Fiction',
	},
	{
		label: 'Fantasy',
		value: 'Fantasy',
	},
	{
		label: 'Non-Fiction',
		value: 'Non-Fiction',
	},
];

const reviewOptions = [
	{
		label: '⭐️',
		value: '⭐️',
	},
	{
		label: '⭐⭐',
		value: '⭐⭐',
	},
	{
		label: '⭐⭐⭐',
		value: '⭐⭐⭐',
	},
	{
		label: '⭐⭐⭐⭐',
		value: '⭐⭐⭐⭐',
	},
	{
		label: '⭐⭐⭐⭐⭐',
		value: '⭐⭐⭐⭐⭐',
	},
	{
		label: 'none',
		value: 'none',
	},
];

export const BookForm = ({ database_id }: BookFormProps) => {
	const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
	const [rangedDatePicked, setRangeDatePicked] = useState<GetBookDatesProps>();
	const [bookData, setBookData] = useState<CreateBook>();

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(bookSchema),
	});
	const watchBookStatus = watch('status');

	const startedDateField = useController({
		name: 'started_date',
		control,
	});
	const finishedDateField = useController({
		name: 'finished_date',
		control,
	});

	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	const handleCreateBook = async (createBookBody: CreateBook) => {
		setIsSubmitButtonLoading(true);

		try {
			await api.post(`/book/create?db=${database_id}`, createBookBody);
			setIsSubmitButtonLoading(false);

			toast('Book Created', {
				position: 'top-center',
				autoClose: 1500,
				theme: 'dark',
				type: 'success',
			});

			setTimeout(() => {
				router.push('/library');
				// router.refresh();
			}, 3000);
		} catch (error) {
			toast('An error ocurred', {
				position: 'top-center',
				autoClose: 1500,
				theme: 'dark',
				type: 'error',
			});
			console.log({ error });
			setIsSubmitButtonLoading(false);
		}
	};

	const handleFormatBookData = useCallback(async () => {
		setIsSubmitButtonLoading(true);

		let bookFormatted = formatBookData(bookData);

		handleCreateBook(bookFormatted);
	}, [bookData, rangedDatePicked]);

	const handleGoBack = () => {
		router.back();
	};

	const handleFormatPickedDates = (dates: any) => {
		if (!dates) return;

		if (!Array.isArray(dates)) dates = Array(dates);

		const [startedDate, finishedDate] = dates.map((date: any) =>
			format(new Date(date['$d'] || ''), 'yyyy-MM-dd'),
		);

		startedDateField.field.onChange(startedDate);
		finishedDateField.field.onChange(finishedDate);
		setValue('started_date', startedDate);
		setValue('finished_date', finishedDate);

		setRangeDatePicked({
			startedDate,
			finishedDate,
		});
	};

	useEffect(() => {
		if (bookData && bookData.name !== '') {
			handleFormatBookData();
		}
	}, [bookData]);

	return (
		<>
			<ToastContainer />
			<CreateBookForm
				onSubmit={handleSubmit((data: CreateBook) => setBookData(data))}
				autoComplete='off'
				ref={formRef}
			>
				<div className='inputs-group'>
					{/* Name */}
					<InputComponent
						{...register('name')}
						error={errors.name}
						label='Name'
						id='book-name'
						placeholder='Ex: Harry Potter'
					/>

					{/* Author */}
					<InputComponent
						{...register('author')}
						error={errors.author}
						label='Book Author'
						id='book-author'
						placeholder='J. K. Rowlling'
					/>

					{/* Cover */}
					<InputComponent
						{...register('icon_url')}
						error={errors.icon_url}
						label='Book Cover (URL or ISBN-10)'
						id='book-cover'
						placeholder='Image URL or ISBN-10 Code'
					/>

					{/* Total Pages */}
					<InputComponent
						{...register('qtd_page', {
							valueAsNumber: true,
						})}
						type='number'
						error={errors.qtd_page}
						label='Total Pages'
						id='book-total-pages'
						placeholder='Image URL or ISBN-10 Code'
					/>

					{/* Current Page */}
					<InputComponent
						{...register('current_page', {
							valueAsNumber: true,
						})}
						type='number'
						error={errors.current_page}
						label='Current Page'
						id='book-current-page'
						placeholder='100'
					/>
				</div>

				{/* Status/Language */}
				<div className='inputs-group'>
					{/* Status */}
					<InputComponent
						id='book-status'
						label='Book Status'
						error={errors.status}
						isCustom
					>
						<Controller
							name='status'
							control={control}
							defaultValue={'To read'}
							render={({ field }) => (
								<Radio.Group
									{...field}
									options={[
										{ label: 'To read', value: 'To read' },
										{ label: 'Reading', value: 'Reading' },
										{ label: 'Finished', value: 'Finished' },
									]}
									optionType='button'
									buttonStyle='solid'
									id='book-status'
								/>
							)}
						/>
					</InputComponent>

					{/* Language */}
					<InputComponent
						id='book-language'
						label='Book Language'
						error={errors.language}
						isCustom
					>
						<Controller
							name='language'
							control={control}
							defaultValue={'Portuguese'}
							render={({ field }) => (
								<Radio.Group
									{...field}
									options={[
										{ label: 'Portuguese', value: 'Portuguese' },
										{ label: 'English', value: 'English' },
									]}
									optionType='button'
									buttonStyle='solid'
									id='book-language'
								/>
							)}
						/>
					</InputComponent>
				</div>

				{/* Genres/Goodreads/Review */}
				<div className='inputs-group'>
					{/* Genres */}
					<InputComponent id='book-genres' label='Book Genres' isCustom>
						<Controller
							name='genres'
							control={control}
							defaultValue={[]}
							render={({ field }) => (
								<AntdSelect
									mode='tags'
									{...field}
									options={genreOptions}
									size='large'
									style={{ width: '100%' }}
									id='book-genres'
								/>
							)}
						/>
					</InputComponent>

					{/* Goodreads */}
					<InputComponent
						id='book-goodreads'
						label='Goodreads'
						error={errors.goodreads_review}
						isCustom
					>
						<Controller
							name='goodreads_review'
							control={control}
							defaultValue={'none'}
							render={({ field }) => (
								<AntdSelect
									{...field}
									options={reviewOptions}
									size='large'
									style={{ width: '100%' }}
									id='book-goodreads'
								/>
							)}
						/>
					</InputComponent>

					{/* Review */}
					{watchBookStatus === 'Finished' && (
						<>
							<InputComponent
								id='book-review-component'
								label='Review'
								error={errors.book_review}
								isCustom
							>
								<Controller
									name='book_review'
									control={control}
									defaultValue={'none'}
									render={({ field }) => (
										<AntdSelect
											{...field}
											options={reviewOptions}
											size='large'
											style={{ width: '100%' }}
											id='book-review'
										/>
									)}
								/>
							</InputComponent>

							<InputComponent
								id='progress-dates-component'
								label='Started & Finished Dates'
								error={errors.finished_date}
								isCustom
							>
								<DatePicker.RangePicker
									placement='bottomRight'
									onChange={e => handleFormatPickedDates(e)}
									style={{ height: '2.5rem' }}
									id='progress_dates'
									ref={finishedDateField.field.ref}
									inputReadOnly
								/>
							</InputComponent>
						</>
					)}

					{watchBookStatus === 'Reading' && (
						<InputComponent
							id='started-date-component'
							label='Started Date'
							error={errors.started_date}
							isCustom
						>
							<DatePicker
								onChange={e => handleFormatPickedDates(e)}
								placeholder='Started Date'
								placement='bottomRight'
								style={{ height: '2.5rem' }}
								id='started_date'
								ref={startedDateField.field.ref}
								inputReadOnly
							/>
						</InputComponent>
					)}
				</div>

				<div className='form-actions'>
					<button
						type='submit'
						className='submit-btn form-btn'
						disabled={isSubmitButtonLoading}
					>
						{isSubmitButtonLoading ? (
							<Rings width={26} height={26} />
						) : (
							'Create'
						)}
					</button>
					<button
						type='button'
						className='cancel-btn form-btn'
						onClick={handleGoBack}
					>
						Cancel
					</button>
				</div>
			</CreateBookForm>
		</>
	);
};