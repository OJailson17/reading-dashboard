'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { StepFormComponentProps } from './BookTitleForm';
import { useMultiForm } from '@/context/MultiFormContext';
import { FormStepsAction } from './StepsAction';

interface BookCover extends Partial<CreateBook> {}

export const BookCoverForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const { onHandleNext, onSetFormData, formData, step, onHandleBack } =
		useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BookCover>({
		defaultValues: formData,
	});

	const handleSaveBookCover = (data: BookCover) => {
		onSetFormData(data);
		onHandleNext();
	};
	return (
		<form onSubmit={handleSubmit(handleSaveBookCover)}>
			<MultiFormWrapper title='Book Cover'>
				<InputComponent
					{...register('icon_url')}
					error={errors.icon_url}
					label='Book Cover (URL or ISBN-10)'
					id='book-cover'
					placeholder='Image URL or ISBN-10 Code'
				/>
			</MultiFormWrapper>

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={onHandleNext}
			/>
		</form>
	);
};
