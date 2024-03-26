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
			<div className='w-full flex justify-between'>
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
							<Select onValueChange={rest.onChange} {...rest}>
								<SelectTrigger className='w-60 max-sm:h-11 max-sm:w-72'>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>

								<SelectContent className='bg-background'>
									<SelectGroup className='bg-background text-span'>
										<SelectItem value='To read' className='max-sm:h-11'>
											To read
										</SelectItem>
										<SelectItem value='Reading' className='max-sm:h-11'>
											Reading
										</SelectItem>
										<SelectItem value='Finished' className='max-sm:h-11'>
											Finished
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
				</InputComponent>

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
							<Select onValueChange={rest.onChange} {...rest}>
								<SelectTrigger className='w-60 max-sm:h-11 max-sm:w-72'>
									<SelectValue placeholder='Select Language' />
								</SelectTrigger>

								<SelectContent className='bg-background'>
									<SelectGroup className='bg-background text-span'>
										<SelectItem value='Portuguese' className='max-sm:h-11'>
											Portuguese
										</SelectItem>
										<SelectItem value='English' className='max-sm:h-11'>
											English
										</SelectItem>
										<SelectItem value='Spanish' className='max-sm:h-11'>
											Spanish
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
				</InputComponent>
			</div>

			<MultiStepFormActions
				onHandleSubmit={handleSubmit(handleSaveStatusLanguage)}
			/>
		</form>
	);
};
