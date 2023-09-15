'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { CreateBook } from '../BookForm';
import { Controller, useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { Select as AntdSelect } from 'antd';
import { StepFormComponentProps } from './BookTitleForm';

interface BookGenres extends Partial<CreateBook> {}

const genreOptions = [
	{
		label: 'Fiction',
		value: 'Fiction',
	},
	{
		label: 'Fantasy',
		value: 'Fantasy',
	},
	{
		label: 'Non-Fiction',
		value: 'Non-Fiction',
	},
];

export const BookGenresForm = ({
	formStep,
	nextFormStep,
}: StepFormComponentProps) => {
	const {
		register,
		control,
		formState: { errors },
	} = useForm<BookGenres>();

	return (
		<>
			<MultiFormWrapper title='Book Genres'>
				<InputComponent id='book-genres' label='Book Genres' isCustom>
					<Controller
						name='genres'
						control={control}
						defaultValue={[]}
						render={({ field }) => (
							<AntdSelect
								mode='tags'
								{...field}
								options={genreOptions}
								size='large'
								style={{ width: '100%' }}
								id='book-genres'
							/>
						)}
					/>
				</InputComponent>
			</MultiFormWrapper>
		</>
	);
};
