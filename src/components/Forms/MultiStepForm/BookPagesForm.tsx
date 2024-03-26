'use client';

import { useForm } from 'react-hook-form';
import { InputComponent } from '../InputComponent';
import { useMultiForm } from '@/context/MultiFormContext';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { Book } from '@/@types/book';
import { yupResolver } from '@hookform/resolvers/yup';
import { MultiStepFormActions } from './MultiStepFormActions';

const bookPagesSchema = yup.object({
	total_pages: yup
		.number()
		.min(1, 'it must be grater than 1 or equal to 1')
		.required('total is required')
		.typeError('total needs to be a number'),
	current_page: yup
		.number()
		.default(0)
		.required()
		.typeError('current page needs to be a number'),
}) as ObjectSchema<Partial<Book>>;

export const BookPagesForm = () => {
	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(bookPagesSchema),
	});

	const handleSavePages = (data: Partial<Book>) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(handleSavePages)}
			className='flex justify-center flex-col gap-12'
		>
			<div className='w-full flex justify-between'>
				<InputComponent
					{...register('total_pages', {
						valueAsNumber: true,
						required: 'Field required',
					})}
					type='number'
					error={errors.total_pages}
					label='Total Pages'
					id='book-total-pages'
					placeholder='300'
					autoFocus
				/>
				<InputComponent
					{...register('current_page', {
						valueAsNumber: true,
						required: 'Field required',
					})}
					type='number'
					error={errors.current_page}
					label='Current Page'
					id='book-current-page'
					placeholder='100'
				/>
			</div>

			{/* Hidden submit */}
			<button type='submit' className='hidden' aria-hidden='true'>
				Submit
			</button>

			<MultiStepFormActions onHandleSubmit={handleSubmit(handleSavePages)} />
		</form>
	);
};
