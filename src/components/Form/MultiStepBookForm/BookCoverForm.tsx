'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { StepFormComponentProps } from './BookTitleForm';

interface BookCover extends Partial<CreateBook> {}

export const BookCoverForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const {
		register,
		formState: { errors },
	} = useForm<BookCover>();

	return (
		<>
			<MultiFormWrapper title='Book Cover'>
				<InputComponent
					{...register('icon_url')}
					error={errors.icon_url}
					label='Book Cover (URL or ISBN-10)'
					id='book-cover'
					placeholder='Image URL or ISBN-10 Code'
				/>
			</MultiFormWrapper>
		</>
	);
};
