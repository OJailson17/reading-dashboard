'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { Controller, useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { Select as AntdSelect } from 'antd';
import { StepFormComponentProps } from './BookTitleForm';
import { useMultiForm } from '@/context/MultiFormContext';
import { FormStepsAction } from './StepsAction';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

export const BookGenresForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const { formData, onSetFormData, step, onHandleBack, onHandleNext } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<BookGenres>({
		defaultValues: formData,
		resolver: yupResolver(bookGenresSchema),
	});

	const handleSaveGenres = (data: BookGenres) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form>
			<MultiFormWrapper title='Book Genres'>
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
			</MultiFormWrapper>

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={handleSubmit(handleSaveGenres)}
			/>
		</form>
	);
};
