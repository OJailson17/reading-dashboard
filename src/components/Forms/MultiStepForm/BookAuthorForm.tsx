'use client';

import { useForm } from 'react-hook-form';
import { InputComponent } from '../InputComponent';
import { useMultiForm } from '@/context/MultiFormContext';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { Book } from '@/@types/book';
import { yupResolver } from '@hookform/resolvers/yup';
import { MultiStepFormActions } from './MultiStepFormActions';

const bookAuthorSchema = yup.object({
	author: yup.string().trim().required('author is required'),
}) as ObjectSchema<Partial<Book>>;

export const BookAuthorForm = () => {
	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(bookAuthorSchema),
	});

	const handleSaveBookAuthor = (data: Partial<Book>) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(handleSaveBookAuthor)}
			className='flex justify-center flex-col gap-12'
		>
			<InputComponent
				{...register('author')}
				error={errors.author}
				label='Author'
				id='book-author'
				placeholder='Ex: J. K. Rowling'
				autoFocus
			/>
			<MultiStepFormActions
				onHandleSubmit={handleSubmit(handleSaveBookAuthor)}
			/>
		</form>
	);
};
