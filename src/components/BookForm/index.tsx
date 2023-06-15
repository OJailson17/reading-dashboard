'use client';

import { api } from '@/lib/axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Select as AntdSelect, Radio } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';

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

			router.push('/library');
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<form onSubmit={handleSubmit(handleCreateBook)}>
			{/* Name */}
			<div>
				<label htmlFor='book-name'>Name</label>
				<input
					type='text'
					id='book-name'
					placeholder='Harry Potter'
					{...register('name')}
				/>
				<span>{errors.name?.message}</span>
			</div>

			{/* Author */}
			<div>
				<label htmlFor='book-author'>Book Author</label>
				<input
					type='text'
					id='book-author'
					placeholder='J. K. Rowlling'
					{...register('author')}
				/>
				<span>{errors.author?.message}</span>
			</div>

			{/* Cover */}
			<div>
				<label htmlFor='book-cover'>Book Cover</label>
				<input
					type='url'
					id='book-cover'
					placeholder='Image URL'
					{...register('icon_url')}
				/>
				<span>{errors.icon_url?.message}</span>
			</div>

			{/* Total Pages */}
			<div>
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
				<span>{errors.qtd_page?.message}</span>
			</div>

			{/* Current Page */}
			<div>
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
				<span>{errors.current_page?.message}</span>
			</div>

			{/* Status/Language */}
			<div>
				{/* Status */}
				<div>
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
					<span>{errors.status?.message}</span>
				</div>

				{/* Language */}
				<div>
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
					<span>{errors.language?.message}</span>
				</div>
			</div>

			{/* Genres/Goodreads */}
			<div>
				{/* Genres */}
				<div>
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
					<span>{errors.genres?.message}</span>
				</div>

				{/* Goodreads */}
				<div>
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
					<span>{errors.goodreads_review?.message}</span>
				</div>
			</div>

			<button type='submit'>Create</button>
		</form>
	);
};
