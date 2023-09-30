'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { CreateBook } from '../BookForm';
import { useMultiForm } from '@/context/MultiFormContext';
import { StepFormComponentProps } from './BookTitleForm';
import { FormStepsAction } from './StepsAction';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
			<form onSubmit={handleSubmit(handleSaveBookAuthor)}>
				<MultiFormWrapper title='Book Author'>
					<InputComponent
						{...register('author', {
							required: 'Campo obrigatório',
						})}
						error={errors.author}
						label='Book Author'
						id='book-author'
						placeholder='J. K. Rowlling'
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
