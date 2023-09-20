'use client';

import React, { useState } from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { InputComponent } from '../BookForm/InputComponent';
import { DatePicker } from 'antd';
import { useController, useForm } from 'react-hook-form';
import { CreateBook } from '../BookForm';
import { format } from 'date-fns';
import { FormStepsAction } from './StepsAction';
import { useMultiForm } from '@/context/MultiFormContext';

interface BookDates extends Partial<CreateBook> {}

interface GetBookDatesProps {
	startedDate: string | null;
	finishedDate: string | null;
}

interface BookDatesFormProps {
	watchBookStatus?: 'To read' | 'Reading' | 'Finished';
}

export const BookDatesForm = ({ watchBookStatus }: BookDatesFormProps) => {
	const [rangedDatePicked, setRangeDatePicked] = useState<GetBookDatesProps>();

	const { formData, onSetFormData, step, onHandleBack, onHandleNext } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		control,
		setValue,
		formState: { errors },
	} = useForm<BookDates>({
		defaultValues: formData,
	});

	const startedDateField = useController({
		name: 'started_date',
		control,
	});
	const finishedDateField = useController({
		name: 'finished_date',
		control,
	});

	const handleFormatPickedDates = (dates: any) => {
		if (!dates) return;

		if (!Array.isArray(dates)) dates = Array(dates);

		const [startedDate, finishedDate] = dates.map((date: any) =>
			format(new Date(date['$d'] || ''), 'yyyy-MM-dd'),
		);

		startedDateField.field.onChange(startedDate);
		finishedDateField.field.onChange(finishedDate);
		setValue('started_date', startedDate);
		setValue('finished_date', finishedDate);

		setRangeDatePicked({
			startedDate,
			finishedDate,
		});
	};

	const handleSaveDates = (data: BookDates) => {
		onSetFormData(data);
	};

	return (
		<form>
			{/* {watchBookStatus === 'Finished' && ( */}
			<MultiFormWrapper title='Book Title'>
				<InputComponent
					id='progress-dates-component'
					label='Started & Finished Dates'
					error={errors.finished_date}
					isCustom
				>
					<DatePicker.RangePicker
						placement='bottomRight'
						onChange={e => handleFormatPickedDates(e)}
						style={{ height: '2.5rem' }}
						id='progress_dates'
						ref={finishedDateField.field.ref}
						inputReadOnly
						status={errors.finished_date ? 'error' : ''}
					/>
				</InputComponent>
			</MultiFormWrapper>
			{/* )} */}

			{/* {watchBookStatus === 'Reading' && ( */}
			<InputComponent
				id='started-date-component'
				label='Started Date'
				error={errors.started_date}
				isCustom
			>
				<DatePicker
					onChange={e => handleFormatPickedDates(e)}
					placeholder='Started Date'
					placement='bottomRight'
					style={{ height: '2.5rem' }}
					id='started_date'
					ref={startedDateField.field.ref}
					inputReadOnly
					status={errors.started_date ? 'error' : ''}
				/>
			</InputComponent>
			{/* )} */}

			<FormStepsAction
				step={step}
				onHandleBack={onHandleBack}
				onHandleSubmit={handleSubmit(handleSaveDates)}
			/>
		</form>
	);
};
