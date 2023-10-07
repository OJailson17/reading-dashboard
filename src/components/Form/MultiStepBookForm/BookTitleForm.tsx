'use client';

import React, { useState } from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { useMultiForm } from '@/context/MultiFormContext';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { FormStepsAction } from './StepsAction';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

interface BookTitle extends Partial<CreateBook> {}

export interface StepFormComponentProps {
	formStep?: number;
	nextFormStep?: () => void;
}

const bookTitleSchema = yup.object({
	name: yup.string().trim().required('name is required'),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookTitleForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const { onHandleNext, onSetFormData, formData, step } = useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
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
