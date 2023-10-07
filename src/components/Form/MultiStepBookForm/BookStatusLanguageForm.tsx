/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback, useEffect } from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { Controller, useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { Radio } from 'antd';
import { CreateBook } from '../BookForm';
import { StepFormComponentProps } from './BookTitleForm';
import { useMultiForm } from '@/context/MultiFormContext';
import { FormStepsAction } from './StepsAction';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { localStorageStrings } from '@/utils/constants/storageStrings';

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

export const BookStatusLanguageForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const { formData, onHandleNext, onHandleBack, step, onSetFormData } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		control,
		watch,
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