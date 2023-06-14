'use client';

import { api } from '@/lib/axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
// import { MultiSelect } from './MultiSelect';
import CreatableSelect from 'react-select/creatable';
import { Select as AntdSelect } from 'antd';

interface BookFormProps {
	database_id: string;
}

interface CreateBook {
	name: string;
	icon_url?: string;
	genres: string[];
	author: string;
	status: 'To read' | 'Reading' | 'Finished';
	language: 'Portuguese' | 'English';
	qtd_page: number;
	current_page: number;
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

export const BookForm = ({ database_id }: BookFormProps) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<CreateBook>();

	const handleCreateBook = async (data: CreateBook) => {
		const createBookBody = {
			name: data.name,
			icon_url: data.icon_url,
			genres: data.genres.map(genre =>
				genre.replace(genre[0], genre[0].toUpperCase()),
			),
			author: data.author,
			status: data.status || 'To read',
			language: data.language || 'Portuguese',
			qtd_page: data.qtd_page || 0,
			current_page: data.current_page || 0,
		};

		console.log({ createBookBody });

		try {
			const createBookResponse = await api.post(
				`/book/create?db=${database_id}`,
				createBookBody,
			);
			const dataResponse = createBookResponse.data;

			console.log({ dataResponse });
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
			</div>

			{/* Genres */}
			<div>
				<label htmlFor='book-genres'>Book Genres</label>
				{/* <MultiSelect label='genres' /> */}
				<Controller
					name='genres'
					control={control}
					render={({ field }) => (
						<AntdSelect
							mode='tags'
							{...field}
							options={genreOptions}
							size='large'
							style={{ width: '100%' }}
						/>
					)}
				/>
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
			</div>

			{/* Status */}
			<div>
				<label htmlFor='book-status'>Book Status</label>
				<input
					type='text'
					id='book-status'
					placeholder='Reading'
					{...register('status')}
				/>
			</div>

			{/* Language */}
			<div>
				<label htmlFor='book-language'>Book Language</label>
				<input
					type='text'
					id='book-language'
					placeholder='Portuguese'
					{...register('language')}
				/>
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
				/>
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
				/>
			</div>

			<button type='submit'>Create</button>
		</form>
	);
};
