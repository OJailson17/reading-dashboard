'use client';

import React from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { Controller, useForm } from 'react-hook-form';
import { InputComponent } from '../BookForm/InputComponent';
import { Radio } from 'antd';
import { CreateBook } from '../BookForm';

interface BookStatusLanguage extends Partial<CreateBook> {}

export const BookStatusLanguageForm = () => {
	const {
		register,
		control,
		formState: { errors },
	} = useForm<BookStatusLanguage>();

	return (
		<>
			<MultiFormWrapper title='Book Status & Language'>
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
			</MultiFormWrapper>
		</>
	);
};
