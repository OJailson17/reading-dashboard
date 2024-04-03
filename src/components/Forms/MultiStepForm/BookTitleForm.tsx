'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { Book } from '@/@types/book';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiStepFormActions } from './MultiStepFormActions';

const bookTitleSchema = yup.object({
	title: yup.string().trim().required('title is required'),
}) as ObjectSchema<Partial<Book>>;

export const BookTitleForm = () => {
	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(bookTitleSchema),
	});

	const handleSaveBookTitle = (data: Partial<Book>) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(handleSaveBookTitle)}
			className='flex justify-center flex-col gap-12'
		>
			<InputComponent
				{...register('title')}
				error={errors.title}
				label='Title'
				id='book-title'
				placeholder='Ex: Harry Potter'
				autoFocus
			/>
			<MultiStepFormActions
				onHandleSubmit={handleSubmit(handleSaveBookTitle)}
			/>
		</form>
	);
};
