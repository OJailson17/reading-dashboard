'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { Book } from '@/@types/book';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiStepFormActions } from './MultiStepFormActions';

const bookCoverSchema = yup.object({
	cover_url: yup.string().trim().optional(),
}) as ObjectSchema<Partial<Book>>;

export const BookCoverForm = () => {
	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(bookCoverSchema),
	});

	const handleSaveBookCover = (data: Partial<Book>) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(handleSaveBookCover)}
			className='flex justify-center flex-col gap-12'
		>
			<InputComponent
				{...register('cover_url')}
				error={errors.cover_url}
				label='Book Cover'
				id='book-author'
				placeholder='URL or ISBN-10'
				autoFocus
			/>
			<MultiStepFormActions
				onHandleSubmit={handleSubmit(handleSaveBookCover)}
			/>
		</form>
	);
};
