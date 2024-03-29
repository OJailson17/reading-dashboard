'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { CreateBook } from '@/@types/bookTypes';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiFormWrapper } from './MultiFormWrapper';
import { FormStepsAction } from './StepsAction';

interface BookTitle extends Partial<CreateBook> {}

export interface StepFormComponentProps {
	formStep?: number;
	nextFormStep?: () => void;
}

const bookTitleSchema = yup.object({
	name: yup.string().trim().required('name is required'),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookTitleForm = () => {
	const { onHandleNext, onSetFormData, formData, step } = useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BookTitle>({
		defaultValues: formData,
		resolver: yupResolver(bookTitleSchema),
	});

	const handleSaveBookTitle = (data: BookTitle) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleSaveBookTitle)} autoComplete='off'>
				<MultiFormWrapper title='Title'>
					<InputComponent
						{...register('name')}
						error={errors.name}
						label=''
						id='book-name'
						placeholder='Ex: Harry Potter'
						autoFocus
					/>
				</MultiFormWrapper>

				<FormStepsAction
					step={step}
					onHandleSubmit={handleSubmit(handleSaveBookTitle)}
				/>
			</form>
		</>
	);
};
