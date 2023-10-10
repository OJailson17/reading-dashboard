'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { CreateBook } from '@/@types/bookTypes';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { StepFormComponentProps } from './BookTitleForm';
import { MultiFormWrapper } from './MultiFormWrapper';
import { FormStepsAction } from './StepsAction';

interface BookAuthor extends Partial<CreateBook> {}

const bookAuthorSchema = yup.object({
	author: yup.string().trim().required('author is required'),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookAuthorForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const { formData, onHandleNext, onSetFormData, onHandleBack, step } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<BookAuthor>({
		defaultValues: formData,
		resolver: yupResolver(bookAuthorSchema),
	});

	const handleSaveBookAuthor = (data: BookAuthor) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<>
			{/* {formStep === 1 && ( */}
			<form onSubmit={handleSubmit(handleSaveBookAuthor)} autoComplete='off'>
				<MultiFormWrapper title='Author'>
					<InputComponent
						{...register('author', {
							required: 'Campo obrigatório',
						})}
						error={errors.author}
						label=''
						id='book-author'
						placeholder='J. K. Rowlling'
						autoFocus
					/>
				</MultiFormWrapper>

				<FormStepsAction
					step={step}
					onHandleBack={onHandleBack}
					onHandleSubmit={handleSubmit(handleSaveBookAuthor)}
				/>
			</form>
		</>
	);
};
