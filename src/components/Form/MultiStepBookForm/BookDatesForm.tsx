'use client';

import React, { useEffect, useState } from 'react';
import { MultiFormWrapper } from './MultiFormWrapper';
import { InputComponent } from '../BookForm/InputComponent';
import { DatePicker } from 'antd';
import { useController, useForm } from 'react-hook-form';
import { CreateBook } from '../BookForm';
import { format } from 'date-fns';
import { FormStepsAction } from './StepsAction';
import { useMultiForm } from '@/context/MultiFormContext';
import { formatBookData } from '@/utils/functions/formatBookData';
import { api } from '@/lib/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { localStorageStrings } from '@/utils/constants/storageStrings';

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

export const BookDatesForm = ({
	watchBookStatus,
	database_id,
}: BookDatesFormProps) => {
	// const [isBSubmitting, setIsSubmitting] = useState(false);
	const [rangedDatePicked, setRangeDatePicked] = useState<GetBookDatesProps>();

	const { formData, onSetFormData, step, onHandleBack, onResetSteps } =
		useMultiForm();

	const {
		handleSubmit,
		register,
		control,
		setValue,
		reset,
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
		// setIsSubmitting(true);

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

	// const handleFormatBookData = async () => {
	// 	setIsSubmitButtonLoading(true);

	// 	let bookFormatted = formatBookData({ bookData: formData });

	// 	console.log({ bookFormatted });

	// 	// handleCreateBook(bookFormatted);
	// };

	const router = useRouter();

	const handleCreateBook = async (book: Partial<CreateBook>) => {
		// console.log({ book });
		// setIsSubmitButtonLoading(true);
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

			localStorage.removeItem(localStorageStrings.BOOK_STATUS);
			localStorage.setItem(localStorageStrings.CREATE_BOOK_SOURCE, 'true');

			await Promise.resolve(router.push('/library'));
		} catch (error) {
			toast('An error ocurred', {
				position: 'top-center',
				autoClose: 1500,
				theme: 'dark',
				type: 'error',
			});
			console.log({ error });
			// setIsSubmitting(false);
		}
	};

	const handleSaveDates = async (data: BookDates) => {
		const { book } = onSetFormData(data);

		const formattedBook = formatBookData({ bookData: book });

		console.log({ book, formattedBook });

		await handleCreateBook(formattedBook);
	};

	// useEffect(() => {
	// 	console.log('calling', isSubmitButtonLoading);

	// 	if (isSubmitButtonLoading) {
	// 		console.log({ formData });
	// 	}
	// }, [isSubmitButtonLoading, formData]);

	useEffect(() => {
		console.log(isSubmitting);
	}, [isSubmitting]);

	if (isSubmitting) {
		return <h1>Creating</h1>;
	}

	console.log('rendered');

	const getBookStatus = localStorage.getItem(
		localStorageStrings.BOOK_STATUS,
	) as 'To read' | 'Reading' | 'Finished';

	return (
		<>
			<ToastContainer />
			<form autoComplete='off'>
				{getBookStatus === 'Finished' && (
					<MultiFormWrapper title='Book Title'>
						<InputComponent
							id='progress-dates-component'
							label='Started & Finished Dates'
							error={errors.finished_date}
							isCustom
							// required
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
