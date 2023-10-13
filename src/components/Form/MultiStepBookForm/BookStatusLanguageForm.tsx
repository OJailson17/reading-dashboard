/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Radio } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { CreateBook } from '@/@types/bookTypes';
import { useMultiForm } from '@/context/MultiFormContext';
import { localStorageStrings } from '@/utils/constants/storageStrings';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiFormWrapper } from './MultiFormWrapper';
import { FormStepsAction } from './StepsAction';

interface BookStatusLanguage extends Partial<CreateBook> {}

const bookStatusLanguageSchema = yup.object({
	status: yup
		.string()
		.oneOf(['To read', 'Reading', 'Finished'])
		.required('status is required'),
	language: yup
		.string()
		.oneOf(['Portuguese', 'English', 'Spanish'])
		.required('language is required'),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookStatusLanguageForm = () => {
	const { formData, onHandleNext, onHandleBack, step, onSetFormData } =
		useMultiForm();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<BookStatusLanguage>({
		defaultValues: formData,
		resolver: yupResolver(bookStatusLanguageSchema),
	});

	const handleSaveBookStatusLanguage = (data: BookStatusLanguage) => {
		onSetFormData(data || { status: 'To read' });

		localStorage.setItem(
			localStorageStrings.BOOK_STATUS,
			data.status || 'To read',
		);

		onHandleNext();
	};

	return (
		<form autoComplete='off'>
			<MultiFormWrapper title='Status & Language'>
				<InputComponent
					id='book-status'
					label='Book Status'
					error={errors.status}
					isCustom
				>
					<Controller
						name='status'
						control={control}
						defaultValue={'To read'}
						render={({ field }) => (
							<Radio.Group
								{...field}
								options={[
									{ label: 'To read', value: 'To read' },
									{ label: 'Reading', value: 'Reading' },
									{ label: 'Finished', value: 'Finished' },
								]}
								optionType='button'
								buttonStyle='solid'
								id='book-status'
							/>
						)}
					/>
				</InputComponent>

				{/* Language */}
				<InputComponent
					id='book-language'
					label='Book Language'
					error={errors.language}
					isCustom
				>
					<Controller
						name='language'
						control={control}
						defaultValue={'Portuguese'}
						render={({ field }) => (
							<Radio.Group
								{...field}
								options={[
									{ label: 'Portuguese', value: 'Portuguese' },
									{ label: 'English', value: 'English' },
									{ label: 'Spanish', value: 'Spanish' },
								]}
								optionType='button'
								buttonStyle='solid'
								id='book-language'
							/>
						)}
					/>
				</InputComponent>
			</MultiFormWrapper>

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={handleSubmit(handleSaveBookStatusLanguage)}
			/>
		</form>
	);
};
