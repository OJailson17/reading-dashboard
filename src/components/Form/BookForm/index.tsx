/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { api } from '@/lib/axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { Select as AntdSelect, DatePicker, Radio } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { CreateBookForm, CreateBookInputContainer } from './styles';
import { Rings } from 'react-loading-icons';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { UpdateDateDialog } from '../../UpdateDateDialog';
import { format } from 'date-fns';
import { ReadingStatus } from '@/types/bookTypes';
import { formatBookData } from '@/helpers/formatBookData';

const bookSchema = yup.object({
	name: yup.string().trim().required(),
	icon_url: yup.string().trim().optional().url(),
	genres: yup.array().ensure().of(yup.string().required()).required(),
	author: yup.string().trim().required(),
	status: yup.string().oneOf(['To read', 'Reading', 'Finished']).required(),
	language: yup.string().oneOf(['Portuguese', 'English']).required(),
	qtd_page: yup.number().min(1).required(),
	current_page: yup.number().default(0).required(),
	goodreads_review: yup.string().trim().default('none').required(),
	started_date: yup
		.string()
		.trim()
		.when('status', {
			is: (value: string) => value === 'Reading' || value === 'Finished',
			then: schema => schema.required(),
			otherwise: schema => schema.nullable(),
		}),
	finished_date: yup
		.string()
		.trim()
		.when('status', {
			is: 'Finished',
			then: schema => schema.required(),
			otherwise: schema => schema.nullable(),
		}),
	book_review: yup.string().trim().optional().default('none'),
});

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
	const [isDatesDialogOpen, setIsDatesDialogOpen] = useState(false);
	const [rangedDatePicked, setRangeDatePicked] = useState<GetBookDatesProps>();
	const [bookData, setBookData] = useState<CreateBook>();
	const [dateTypeDialog, setDateTypeDialog] = useState<ReadingStatus | null>(
		null,
	);

	const {
		register,
		handleSubmit,
		control,
		watch,
		setError,
		clearErrors,
		setValue,
		formState: { errors, isValid },
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

	const handleChangeDatesDialogState = (dialogState: boolean) => {
		setIsDatesDialogOpen(dialogState);
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

	const handleGetBookDates = ({
		startedDate,
		finishedDate,
	}: GetBookDatesProps) => {
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
			<UpdateDateDialog
				isDialogOpen={isDatesDialogOpen}
				onChangeModalState={handleChangeDatesDialogState}
				onGetBookDates={handleGetBookDates}
				dateTypeDialog={dateTypeDialog}
			/>
			<CreateBookForm
				onSubmit={handleSubmit((data: CreateBook) => setBookData(data))}
				autoComplete='off'
			>
				<div className='inputs-group'>
					{/* Name */}
					<CreateBookInputContainer>
						<label htmlFor='book-name'>Name</label>
						<input
							type='text'
							id='book-name'
							placeholder='Harry Potter'
							{...register('name')}
						/>
						<span className='error-message'>{errors.name?.message}</span>
					</CreateBookInputContainer>

					{/* Author */}
					<CreateBookInputContainer>
						<label htmlFor='book-author'>Book Author</label>
						<input
							type='text'
							id='book-author'
							placeholder='J. K. Rowlling'
							{...register('author')}
						/>
						<span className='error-message'>{errors.author?.message}</span>
					</CreateBookInputContainer>

					{/* Cover */}
					<CreateBookInputContainer>
						<label htmlFor='book-cover'>Book Cover</label>
						<input
							type='url'
							id='book-cover'
							placeholder='Image URL'
							{...register('icon_url')}
						/>
						<span className='error-message'>{errors.icon_url?.message}</span>
					</CreateBookInputContainer>

					{/* Total Pages */}
					<CreateBookInputContainer>
						<label htmlFor='book-total-pages'>Total Pages</label>
						<input
							type='number'
							id='book-total-pages'
							placeholder='300'
							{...register('qtd_page', {
								valueAsNumber: true,
							})}
							defaultValue={0}
						/>
						<span className='error-message'>{errors.qtd_page?.message}</span>
					</CreateBookInputContainer>

					{/* Current Page */}
					<CreateBookInputContainer>
						<label htmlFor='book-current-page'>Current Page</label>
						<input
							type='number'
							id='book-current-page'
							placeholder='100'
							{...register('current_page', {
								valueAsNumber: true,
							})}
							defaultValue={0}
						/>
						<span className='error-message'>
							{errors.current_page?.message}
						</span>
					</CreateBookInputContainer>
				</div>

				{/* Status/Language */}
				<div className='inputs-group'>
					{/* Status */}
					<CreateBookInputContainer className='book-status'>
						<label htmlFor='book-status'>Book Status</label>
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
						<span className='error-message'>{errors.status?.message}</span>
					</CreateBookInputContainer>

					{/* Language */}
					<CreateBookInputContainer className='book-language'>
						<label htmlFor='book-language'>Book Language</label>
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
						<span className='error-message'>{errors.language?.message}</span>
					</CreateBookInputContainer>
				</div>

				{/* Genres/Goodreads/Review */}
				<div className='inputs-group'>
					{/* Genres */}
					<CreateBookInputContainer>
						<label htmlFor='book-genres'>Book Genres</label>
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
						<span className='error-message'>{errors.genres?.message}</span>
					</CreateBookInputContainer>

					{/* Goodreads */}
					<CreateBookInputContainer>
						<label htmlFor='book-goodreads'>Goodreads</label>
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
						<span className='error-message'>
							{errors.goodreads_review?.message}
						</span>
					</CreateBookInputContainer>

					{/* Review */}
					{watchBookStatus === 'Finished' && (
						<>
							<CreateBookInputContainer>
								<label htmlFor='book-goodreads'>Review</label>
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
								<span className='error-message'>
									{errors.book_review?.message}
								</span>
							</CreateBookInputContainer>

							<CreateBookInputContainer>
								<label htmlFor='progress_dates'>Started & Finished Dates</label>
								<DatePicker.RangePicker
									placement='bottomRight'
									onChange={e => handleFormatPickedDates(e)}
									style={{ height: '2.5rem' }}
									id='progress_dates'
									ref={finishedDateField.field.ref}
									inputReadOnly
								/>
								<span className='error-message'>
									{errors.started_date?.message}
								</span>
								<span className='error-message'>
									{errors.finished_date?.message}
								</span>
							</CreateBookInputContainer>
						</>
					)}

					{watchBookStatus === 'Reading' && (
						<CreateBookInputContainer>
							<label htmlFor='started_date'>Started Date</label>
							<DatePicker
								onChange={e => handleFormatPickedDates(e)}
								placeholder='Started Date'
								placement='bottomRight'
								style={{ height: '2.5rem' }}
								id='started_date'
								ref={startedDateField.field.ref}
								inputReadOnly
							/>
							<span className='error-message'>
								{errors.started_date?.message}
							</span>
						</CreateBookInputContainer>
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
