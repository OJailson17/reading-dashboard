'use client';

import { Select as AntdSelect } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { CreateBook } from '@/@types/bookTypes';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiFormWrapper } from './MultiFormWrapper';
import { FormStepsAction } from './StepsAction';

interface BookGenres extends Partial<CreateBook> {}

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

const bookGenresSchema = yup.object({
	genres: yup
		.array()
		.ensure()
		.of(yup.string().trim().required())
		.required('genre is required'),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookGenresForm = () => {
	const { formData, onSetFormData, step, onHandleBack, onHandleNext } =
		useMultiForm();

	const { handleSubmit, control } = useForm<BookGenres>({
		defaultValues: formData,
		resolver: yupResolver(bookGenresSchema),
	});

	const handleSaveGenres = (data: BookGenres) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form autoComplete='off'>
			<MultiFormWrapper title='Genres'>
				<InputComponent id='book-genres' label='' isCustom>
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
			</MultiFormWrapper>

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={handleSubmit(handleSaveGenres)}
			/>
		</form>
	);
};
