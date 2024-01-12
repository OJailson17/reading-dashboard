import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CreateBook } from '@/@types/bookTypes';
import { useBook } from '@/context/BookContext';
import { useMultiForm } from '@/context/MultiFormContext';
import { formatBookData } from '@/utils/functions/formatBookData';
import { formatPrice } from '@/utils/functions/formatPrice';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiFormWrapper } from './MultiFormWrapper';
import { FormStepsAction } from './StepsAction';

interface BookPrice extends Partial<CreateBook> {}

const bookPriceSchema = yup.object({
	book_price: yup.string().trim().optional().nullable().default(null),
}) as yup.ObjectSchema<Partial<CreateBook>>;

export const BookPriceForm = () => {
	const { formData, onHandleBack, step, onHandleNext, onSetFormData } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<BookPrice>({
		defaultValues: formData,
		resolver: yupResolver(bookPriceSchema),
	});

	const handleSaveBookPrice = async (data: BookPrice) => {
		onSetFormData(data);

		onHandleNext();
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleSaveBookPrice)} autoComplete='off'>
				<MultiFormWrapper title='Book Price'>
					<InputComponent
						error={errors.book_price}
						label=''
						id='book-price'
						isCustom
					>
						<Controller
							control={control}
							name='book_price'
							render={({ field, formState: { errors } }) => (
								<>
									<input
										onChange={e => {
											e.target.value = formatPrice(e.target.value);
											field.onChange(e);
										}}
										defaultValue={formatPrice('0')}
										autoFocus
									/>
								</>
							)}
						/>
					</InputComponent>
				</MultiFormWrapper>

				<FormStepsAction
					step={step}
					onHandleBack={onHandleBack}
					onHandleSubmit={handleSubmit(handleSaveBookPrice)}
				/>
			</form>
		</>
	);
};
