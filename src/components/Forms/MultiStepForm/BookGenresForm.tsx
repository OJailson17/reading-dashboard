'use client';

import { useMultiForm } from '@/context/MultiFormContext';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { Book, Genre } from '@/@types/book';
import { MultiStepFormActions } from './MultiStepFormActions';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';

const bookGenresSchema = yup.object({
	genres: yup.array().ensure().of(yup.string().trim().required()),
	// .required('genre is required'),
}) as ObjectSchema<Partial<Book>>;

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
		label: 'Non-fiction',
		value: 'Non-fiction',
	},
];

interface Genres extends Genre {}

export const BookGenresForm = () => {
	const [selectedGenres, setSelectedGenres] = useState<Genres[]>([]);

	const { formData, onSetFormData, onHandleNext } = useMultiForm();

	const handleSaveGenres = () => {
		onSetFormData({
			...formData,
			genres: selectedGenres,
		});
		onHandleNext();
	};

	const handleSelectGenres = (genres: any) => {
		const cleanGenres = genres.map((genre: any) => {
			return {
				name: genre.value,
			};
		});

		setSelectedGenres(cleanGenres);
	};

	return (
		<form autoComplete='off' className='flex justify-center flex-col gap-12'>
			<div className='w-full flex items-center justify-between'>
				<CreatableSelect
					isMulti
					options={genreOptions}
					onChange={handleSelectGenres}
					className='w-full max-w-80'
				/>
			</div>

			<MultiStepFormActions onHandleSubmit={handleSaveGenres} />
		</form>
	);
};
