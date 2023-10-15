'use client';

import { DatePicker } from 'antd';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { ObjectSchema } from 'yup';

import { CreateBook } from '@/@types/bookTypes';
import { useMultiForm } from '@/context/MultiFormContext';
import { api } from '@/lib/axios';
import { localStorageStrings } from '@/utils/constants/storageStrings';
import { formatBookData } from '@/utils/functions/formatBookData';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiFormWrapper } from './MultiFormWrapper';
import { FormStepsAction } from './StepsAction';

interface BookDates extends Partial<CreateBook> {}

interface GetBookDatesProps {
	startedDate: string | null;
	finishedDate: string | null;
}

interface BookDatesFormProps {
	watchBookStatus?: 'To read' | 'Reading' | 'Finished';
	database_id: string;
}

const bookDatesSchema = yup.object({
	started_date: yup
		.string()
		.trim()
		.when('status', {
			is: (value: string) => value === 'Reading' || value === 'Finished',
			then: schema => schema.required('started date is required'),
			otherwise: schema => schema.nullable(),
		}),
	finished_date: yup
		.string()
		.trim()
		.when('status', {
			is: 'Finished',
			then: schema =>
				schema.required('started and finished dates are required'),
			otherwise: schema => schema.nullable(),
		}),
}) as ObjectSchema<Partial<CreateBook>>;

export const BookDatesFormComponent = ({ database_id }: BookDatesFormProps) => {
	const [rangedDatePicked, setRangeDatePicked] = useState<GetBookDatesProps>();

	const { formData, step, onHandleBack } = useMultiForm();

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<BookDates>({
		defaultValues: formData,
		resolver: yupResolver(bookDatesSchema),
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
		setValue('started_date', startedDate, {
			shouldValidate: true,
		});
		setValue('finished_date', finishedDate, {
			shouldValidate: true,
		});

		setRangeDatePicked({
			startedDate,
			finishedDate,
		});
	};

	const router = useRouter();

	const handleCreateBook = async (book: Partial<CreateBook>) => {
		try {
			await api.post(`/book/create?db=${database_id}`, book, {
				timeout: 30000,
				timeoutErrorMessage: 'It took too long, try again.',
			});

			toast('Book Created', {
				position: 'top-center',
				autoClose: 1500,
				theme: 'dark',
				type: 'success',
			});

			localStorage.setItem(localStorageStrings.CREATE_BOOK_SOURCE, 'true');

			setTimeout(async () => {
				return await Promise.resolve(router.push('/library'));
			}, 2500);
		} catch (error) {
			toast('An error ocurred', {
				position: 'top-center',
				autoClose: 1500,
				theme: 'dark',
				type: 'error',
			});
			console.log({ error });
		}
	};

	const handleSaveDates = async (data: BookDates) => {
		const formattedBook = formatBookData({ bookData: data });

		await handleCreateBook(formattedBook);
	};

	const getBookStatus = localStorage.getItem(
		localStorageStrings.BOOK_STATUS,
	) as 'To read' | 'Reading' | 'Finished';

	return (
		<>
			<ToastContainer />
			<form autoComplete='off'>
				{getBookStatus === 'To read' && (
					<p style={{ marginTop: '2rem' }}>
						Data filled, click on <strong>Create</strong> to confirm
					</p>
				)}

				{getBookStatus === 'Finished' && (
					<MultiFormWrapper title='Dates'>
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
				)}

				{getBookStatus === 'Reading' && (
					<MultiFormWrapper title='Dates'>
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
					</MultiFormWrapper>
				)}

				<FormStepsAction
					step={step}
					onHandleBack={onHandleBack}
					onHandleSubmit={handleSubmit(handleSaveDates)}
					isLoading={isSubmitting}
				/>
			</form>
		</>
	);
};

export const BookDatesForm = React.memo(BookDatesFormComponent);

BookDatesForm.displayName = 'BookDatesForm';
