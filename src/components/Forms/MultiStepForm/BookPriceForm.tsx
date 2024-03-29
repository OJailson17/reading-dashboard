'use client';

import { Controller, useForm } from 'react-hook-form';
import { InputComponent } from '../InputComponent';
import { useMultiForm } from '@/context/MultiFormContext';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { Book } from '@/@types/book';
import { yupResolver } from '@hookform/resolvers/yup';
import { MultiStepFormActions } from './MultiStepFormActions';
import { formatPrice } from '@/utils/formatPrice';

const bookPriceSchema = yup.object({
	book_price: yup.string().trim().optional().nullable().default(null),
}) as ObjectSchema<Partial<Book>>;

export const BookPriceForm = () => {
	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(bookPriceSchema),
	});

	const handleSaveBookPrice = (data: Partial<Book>) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(handleSaveBookPrice)}
			className='flex justify-center flex-col gap-12'
		>
			<InputComponent
				error={errors.book_price}
				label=''
				id='book-price'
				isCustom
			>
				<Controller
					control={control}
					name='book_price'
					render={({ field }) => (
						<>
							<input
								onChange={e => {
									e.target.value = formatPrice(e.target.value);
									field.onChange(e);
								}}
								defaultValue={formatPrice(field.value || '0')}
								autoFocus
								className='py-3 px-4 bg-background rounded-md text-white placeholder:text-placeholder placeholder:text-sm'
							/>
						</>
					)}
				/>
			</InputComponent>
			<MultiStepFormActions
				onHandleSubmit={handleSubmit(handleSaveBookPrice)}
			/>
		</form>
	);
};
