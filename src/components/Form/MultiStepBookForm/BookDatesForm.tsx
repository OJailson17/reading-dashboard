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

import 'react-toastify/dist/ReactToastify.css';

interface BookDates extends Partial<CreateBook> {}

interface GetBookDatesProps {
	startedDate: string | null;
	finishedDate: string | null;
}

interface BookDatesFormProps {
	watchBookStatus?: 'To read' | 'Reading' | 'Finished';
	database_id: string;
}

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
		formState: { errors, isSubmitting, isLoading, isValidating },
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
		// setIsSubmitting(true);

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

			localStorage.removeItem('@reading_dashboard:book_status');

			setTimeout(() => {
				reset();
				onResetSteps();

				// router.push('/library');
				// router.refresh();
				console.log('created');
			}, 3000);
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

	console.log({ isSubmitting, isLoading, isValidating });

	console.log('rendered');

	const getBookStatus = localStorage.getItem(
		'@reading_dashboard:book_status',
	) as 'To read' | 'Reading' | 'Finished';

	return (
		<>
			<ToastContainer />
			<form>
				{getBookStatus === 'Finished' && (
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
				/>
			</form>
		</>
	);
};
