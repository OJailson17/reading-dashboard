'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { InputComponent } from '../InputComponent';
import { DatePicker, Select as AntdSelect } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useMultiForm } from '@/context/MultiFormContext';
import { FormStepsAction } from './StepsAction';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { localStorageStrings } from '@/utils/constants/storageStrings';
import { CreateBook } from '@/@types/bookTypes';

interface BookReview extends Partial<CreateBook> {}

interface BookReviewForm {
	database_id: string;
}

const RatingOptions = [
	{
		label: ' ⭐️ ',
		value: 'b76a9fe1-b636-47b3-ab49-a264ee49d4f9',
	},
	{
		label: ' ⭐ ⭐ ',
		value: 'b04af175-1da7-4910-90de-05323b8d84de',
	},
	{
		label: ' ⭐ ⭐ ⭐ ',
		value: 'ce75ca4c-ce00-4d64-a2a4-88fa0e8de252',
	},
	{
		label: ' ⭐ ⭐ ⭐ ⭐ ',
		value: '37bf3f5a-74c7-42d1-a5a3-2a08d6f258dd',
	},
	{
		label: ' ⭐ ⭐ ⭐ ⭐ ⭐ ',
		value: '71a79313-505a-4c38-a050-ee28f9ea3fe4',
	},
	{
		label: 'none',
		value: '90de4911-f67a-44bf-893e-3aeddb3e3e1e',
	},
];
const GoodreadsOptions = [
	//goodreads
	{
		label: ' ⭐️ ',
		value: '657f34f5-548c-4965-83b1-036a7927fc4b',
	},
	{
		label: ' ⭐ ⭐ ',
		value: '6de63a3d-6efe-4ace-a866-dae14f53d9bd',
	},
	{
		label: ' ⭐ ⭐ ⭐ ',
		value: '7ae6ef66-f223-4ca6-9db7-1a8d59b24d18',
	},
	{
		label: ' ⭐ ⭐ ⭐ ⭐ ',
		value: 'f9ba4d94-4bcb-4453-b99f-78316a97cd87',
	},
	{
		label: ' ⭐ ⭐ ⭐ ⭐ ⭐ ',
		value: 'f02396d5-e2b5-4119-bc7c-58d6a31d53cc',
	},
	{
		label: 'none',
		value: 'd5dc3000-0846-4c4f-970a-64202b433a16',
	},
];

const bookReviewSchema = yup.object({
	book_review: yup.string().trim().optional(),
	goodreads_review: yup
		.string()
		.trim()
		.required('goodreads review is required'),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookReviewForm = ({ database_id }: BookReviewForm) => {
	const { onHandleNext, onSetFormData, formData, step, onHandleBack } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		control,
		watch,
		formState: { errors },
	} = useForm<BookReview>({
		defaultValues: formData,
		resolver: yupResolver(bookReviewSchema),
	});

	const handleSaveBookReview = (data: BookReview) => {
		onSetFormData(data);
		onHandleNext();
	};

	const demoDatabaseId = process.env.NEXT_PUBLIC_DEMO_DATABASE_ID;
	const IS_DEMO_VERSION = database_id === demoDatabaseId;

	const getBookStatus = localStorage.getItem(
		localStorageStrings.BOOK_STATUS,
	) as 'To read' | 'Reading' | 'Finished';

	return (
		<form autoComplete='off'>
			<MultiFormWrapper title='Goodreads and Review'>
				<InputComponent
					id='book-goodreads'
					label='Goodreads'
					error={errors.goodreads_review}
					isCustom
				>
					<Controller
						name='goodreads_review'
						control={control}
						defaultValue={
							IS_DEMO_VERSION
								? RatingOptions[5].value
								: GoodreadsOptions[5].value
						}
						render={({ field }) => (
							<AntdSelect
								{...field}
								options={IS_DEMO_VERSION ? RatingOptions : GoodreadsOptions}
								size='large'
								style={{ width: '100%' }}
								id='book-goodreads'
								status={errors.goodreads_review ? 'error' : ''}
							/>
						)}
					/>
				</InputComponent>

				{/* Review */}
				{getBookStatus === 'Finished' && (
					<>
						<InputComponent
							id='book-review-component'
							label='Review'
							error={errors.book_review}
							isCustom
						>
							<Controller
								name='book_review'
								control={control}
								defaultValue={RatingOptions[5].value}
								render={({ field }) => (
									<AntdSelect
										{...field}
										options={RatingOptions}
										size='large'
										style={{ width: '100%' }}
										id='book-review'
									/>
								)}
							/>
						</InputComponent>
					</>
				)}
			</MultiFormWrapper>

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={handleSubmit(handleSaveBookReview)}
			/>
		</form>
	);
};
