import { Book } from '@/@types/book';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { InputComponent } from '../InputComponent';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { MultiStepFormActions } from './MultiStepFormActions';
import { handleFormatDate } from '@/utils/formatDate';
import { removePriceFormat } from '@/utils/formatPrice';
import { FaFaceSmileBeam } from 'react-icons/fa6';

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
}) as ObjectSchema<Partial<Book>>;

export const BookDatesForm = () => {
	const { formData } = useMultiForm();

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: formData,
		resolver: yupResolver(bookDatesSchema),
	});

	const handleSaveDates = (data: Partial<Book>) => {
		const book = handleFormatBook(data);
		console.log({ book });
	};

	const handleSelectDate = (date: Date, onChange: any) => {
		const formattedDate = handleFormatDate(date, 'utc');
		onChange(formattedDate);
	};

	const handleFormatBook = (book: Partial<Book>) => {
		book.book_price = removePriceFormat(book.book_price || '');

		if (book.status === 'Finished') {
			book.current_page = book.total_pages;
		}

		return book;
	};

	return (
		<form
			autoComplete='off'
			onSubmit={handleSubmit(handleSaveDates)}
			className='flex justify-center flex-col gap-12'
		>
			<div className='w-full flex flex-col items-start max-lg:gap-6 lg:items-center justify-between lg:flex-row'>
				{formData.status === 'To read' && (
					<div className='space-y-4'>
						<p className='flex gap-2 items-center justify-center'>
							All the information was filled
							<FaFaceSmileBeam />
						</p>
						<p>
							Click on <strong>Create</strong> to confirm
						</p>
					</div>
				)}

				{formData.status === 'Reading' || formData.status === 'Finished' ? (
					<div className='w-full'>
						<InputComponent
							id='started_date'
							label='Started Date'
							error={errors.started_date}
							isCustom
						>
							<Controller
								name='started_date'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Popover>
										<PopoverTrigger asChild>
											<div className='w-full py-3 px-4 cursor-pointer bg-background rounded-md text-span'>
												{value ? value : 'Pick a date'}
											</div>
										</PopoverTrigger>

										<PopoverContent className='w-auto p-0'>
											<Calendar
												mode='single'
												selected={new Date()}
												onSelect={e =>
													handleSelectDate(e || new Date(), onChange)
												}
												disabled={date =>
													date > new Date() || date < new Date('1900-01-01')
												}
												className='bg-secondary-background border-none text-span'
											/>
										</PopoverContent>
									</Popover>
								)}
							/>
						</InputComponent>
					</div>
				) : null}

				{formData.status === 'Finished' && (
					<div className='w-full'>
						<InputComponent
							id='finished_date'
							label='Finished Date'
							error={errors.finished_date}
							isCustom
						>
							<Controller
								name='finished_date'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Popover>
										<PopoverTrigger asChild>
											<div className='w-full py-3 px-4 cursor-pointer bg-background rounded-md text-span'>
												{value ? value : 'Pick a date'}
											</div>
										</PopoverTrigger>

										<PopoverContent className='w-auto p-0'>
											<Calendar
												mode='single'
												selected={new Date()}
												onSelect={e =>
													handleSelectDate(e || new Date(), onChange)
												}
												disabled={date =>
													date > new Date() || date < new Date('1900-01-01')
												}
												className='bg-secondary-background border-none text-span'
											/>
										</PopoverContent>
									</Popover>
								)}
							/>
						</InputComponent>
					</div>
				)}
			</div>

			<MultiStepFormActions
				onHandleSubmit={handleSubmit(handleSaveDates)}
				isLoading={isSubmitting}
			/>
		</form>
	);
};
