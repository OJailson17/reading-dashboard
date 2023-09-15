'use client';

import React, { useState } from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { useMultiForm } from '@/context/MultiFormContext';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

interface BookTitle extends Partial<CreateBook> {}

export interface StepFormComponentProps {
	formStep: number;
	nextFormStep: () => void;
}

export const BookTitleForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BookTitle>({ mode: 'all' });

	const { setFormValues } = useMultiForm();

	const handleSaveBookTitle = (data: BookTitle) => {
		setFormValues(data);
		nextFormStep();
	};

	return (
		<>
			{formStep === 0 && (
				<form onSubmit={handleSubmit(handleSaveBookTitle)}>
					<MultiFormWrapper title='Book Title'>
						<InputComponent
							{...register('name')}
							error={errors.name}
							label='Name'
							id='book-name'
							placeholder='Ex: Harry Potter'
						/>
					</MultiFormWrapper>
				</form>
			)}
		</>
	);
};
