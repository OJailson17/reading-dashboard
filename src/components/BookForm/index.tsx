'use client';

import { api } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Select as AntdSelect, Radio } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { CreateBookForm, CreateBookInputContainer } from './styles';
import { Rings } from 'react-loading-icons';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
});

type CreateBook = yup.InferType<typeof bookSchema>;

interface BookFormProps {
	database_id: string;
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

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(bookSchema),
	});

	const router = useRouter();

	const handleCreateBook = async (data: CreateBook) => {
		setIsSubmitButtonLoading(true);

		const createBookBody = {
			name: data.name,
			icon_url: data.icon_url,
			genres:
				(data.genres &&
					data.genres.map(genre =>
						genre.replace(genre[0], genre[0].toUpperCase()),
					)) ||
				[],
			author: data.author,
			status: data.status,
			language: data.language,
			qtd_page: data.qtd_page,
			current_page: data.current_page,
			goodreads_review: data.goodreads_review,
		};

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

	return (
		<>
			<ToastContainer />
			<CreateBookForm onSubmit={handleSubmit(handleCreateBook)}>
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

				{/* Genres/Goodreads */}
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
				</div>

				<button
					type='submit'
					className='submit-btn'
					disabled={isSubmitButtonLoading}
				>
					{isSubmitButtonLoading ? <Rings width={26} height={26} /> : 'Create'}
				</button>
			</CreateBookForm>
		</>
	);
};
