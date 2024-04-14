'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';
import * as yup from 'yup';

import { Tab } from '@/app/bookshelf/page';
import { yupResolver } from '@hookform/resolvers/yup';

const searchFormSchema = yup.object({
	query: yup.string().optional(),
});

type SearchBookForm = yup.InferType<typeof searchFormSchema>;

export const BookshelfSearch = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SearchBookForm>({
		resolver: yupResolver(searchFormSchema),
	});

	const router = useRouter();

	const handleSearch = ({ query }: SearchBookForm) => {
		if (!query || query.trim() === '') {
			return router.push(`/bookshelf/?tab=all`, {
				scroll: false,
			});
		}

		return router.push(`/bookshelf/?tab=all&q=${query}`, {
			scroll: false,
		});
	};

	return (
		<form
			onSubmit={handleSubmit(handleSearch)}
			autoComplete='off'
			className='w-full xs:max-[500px]:h-12 sm:w-80 h-10 bg-background flex items-center justify-center gap-3 pl-5 rounded-full'
		>
			<IoIosSearch size={25} />

			<input
				type='text'
				placeholder='Search books'
				className='w-full h-full bg-transparent text-span rounded-tr-full rounded-br-full px-3 placeholder:text-placeholder placeholder:text-sm outline-none'
				{...register('query')}
			/>
		</form>
	);
};
