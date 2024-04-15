'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

const searchFormSchema = yup.object({
	query: yup.string().optional(),
});

type SearchBookForm = yup.InferType<typeof searchFormSchema>;

export const BookshelfSearch = () => {
	const { register, handleSubmit, resetField, watch } = useForm<SearchBookForm>(
		{
			resolver: yupResolver(searchFormSchema),
		},
	);

	const queryFieldWatch = watch('query');
	const router = useRouter();

	const handleSearch = ({ query }: SearchBookForm) => {
		// const activeElement = document.activeElement as HTMLInputElement;
		// activeElement.blur();

		if (!query || query.trim() === '') {
			return router.push(`/bookshelf/?tab=all`, {
				scroll: false,
			});
		}

		return router.push(`/bookshelf/?tab=all&q=${query}`, {
			scroll: false,
		});
	};

	const handleResetSearch = () => {
		resetField('query');

		router.push(`/bookshelf/?tab=all`, {
			scroll: false,
		});
	};

	return (
		<form
			onSubmit={handleSubmit(handleSearch)}
			autoComplete='off'
			className='w-full xs:max-[500px]:h-12 sm:w-80 h-10 bg-background flex items-center justify-center gap-3 shrink-0 px-5 rounded-full'
		>
			<IoIosSearch size={25} />

			<input
				type='text'
				placeholder='Search books'
				className='w-full max-w-72 h-full bg-transparent text-span px-3 placeholder:text-placeholder placeholder:text-sm outline-none'
				{...register('query')}
			/>

			{queryFieldWatch && queryFieldWatch.length > 0 ? (
				<button
					onClick={handleResetSearch}
					className='bg-transparent border-none rounded-sm'
					type='button'
				>
					<IoCloseOutline size={20} />
				</button>
			) : (
				<div className='w-5 h-5 bg-transparent' />
			)}
		</form>
	);
};
