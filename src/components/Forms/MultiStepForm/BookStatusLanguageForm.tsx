'use client';

import { Controller, useForm } from 'react-hook-form';
import { InputComponent } from '../InputComponent';
import { useMultiForm } from '@/context/MultiFormContext';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { Book } from '@/@types/book';
import { yupResolver } from '@hookform/resolvers/yup';
import { MultiStepFormActions } from './MultiStepFormActions';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const bookStatusLanguageSchema = yup.object({
	status: yup
		.string()
		.oneOf(['To read', 'Reading', 'Finished'])
		.default('To read')
		.required('status is required'),
	language: yup
		.string()
		.oneOf(['Portuguese', 'English', 'Spanish'])
		.default('Portuguese')
		.required('language is required'),
}) as ObjectSchema<Partial<Book>>;

export const BookStatusLanguageForm = () => {
	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(bookStatusLanguageSchema),
	});

	const handleSaveStatusLanguage = (data: Partial<Book>) => {
		onSetFormData(data);
		onHandleNext();
	};

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(handleSaveStatusLanguage)}
			className='flex justify-center flex-col gap-12'
		>
			<div className='w-full flex items-center justify-between'>
				<div className='w-1/2'>
					<InputComponent
						{...register('status')}
						error={errors.status}
						label='Status'
						id='book-status'
						isCustom
					>
						<Controller
							name='status'
							control={control}
							defaultValue={'To read'}
							render={({ field: { ref, ...rest } }) => (
								<RadioGroup
									defaultValue='To read'
									onValueChange={rest.onChange}
									{...rest}
									className='flex items-start justify-start gap-4 max-sm:flex-col'
								>
									<div className='flex items-center justify-center gap-2'>
										<RadioGroupItem
											className='text-white border-white'
											value='To read'
											id='To read'
										/>
										<label className='cursor-pointer' htmlFor='To read'>
											To read
										</label>
									</div>
									<div className='flex items-center justify-center gap-2'>
										<RadioGroupItem
											className='text-white border-white'
											value='Reading'
											id='Reading'
										/>
										<label className='cursor-pointer' htmlFor='Reading'>
											Reading
										</label>
									</div>
									<div className='flex items-center justify-center gap-2'>
										<RadioGroupItem
											className='text-white border-white'
											value='Finished'
											id='Finished'
										/>
										<label className='cursor-pointer' htmlFor='Finished'>
											Finished
										</label>
									</div>
								</RadioGroup>
							)}
						/>
					</InputComponent>
				</div>

				<div className='1/2'>
					<InputComponent
						{...register('language')}
						error={errors.language}
						label='Language'
						id='book-language'
						isCustom
					>
						<Controller
							name='language'
							control={control}
							defaultValue={'Portuguese'}
							render={({ field: { ref, ...rest } }) => (
								<RadioGroup
									defaultValue='Portuguese'
									onValueChange={rest.onChange}
									{...rest}
									className='flex items-start justify-start gap-4 max-sm:flex-col'
								>
									<div className='flex items-center justify-center gap-2'>
										<RadioGroupItem
											className='text-white border-white'
											value='Portuguese'
											id='Portuguese'
										/>
										<label className='cursor-pointer' htmlFor='Portuguese'>
											Portuguese
										</label>
									</div>
									<div className='flex items-center justify-center gap-2'>
										<RadioGroupItem
											className='text-white border-white'
											value='English'
											id='English'
										/>
										<label className='cursor-pointer' htmlFor='English'>
											English
										</label>
									</div>
									<div className='flex items-center justify-center gap-2'>
										<RadioGroupItem
											className='text-white border-white'
											value='Spanish'
											id='Spanish'
										/>
										<label className='cursor-pointer' htmlFor='Spanish'>
											Spanish
										</label>
									</div>
								</RadioGroup>
							)}
						/>
					</InputComponent>
				</div>
			</div>

			<MultiStepFormActions
				onHandleSubmit={handleSubmit(handleSaveStatusLanguage)}
			/>
		</form>
	);
};
