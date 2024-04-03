'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import * as yup from 'yup';

import { Book } from '@/@types/book';
import { yupResolver } from '@hookform/resolvers/yup';

import { BookDialog } from '../BookDialog';
import { TBRBookStats } from '../TBRCard/TBRBookStats';
import { Dialog } from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { toast } from '../ui/use-toast';

interface SearchBarProps {
	books: Book[];
}

const searchFormSchema = yup.object({
	query: yup.string().trim().required('field required!'),
});

type SearchBookForm = yup.InferType<typeof searchFormSchema>;

export const SearchBar = ({ books }: SearchBarProps) => {
	const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
	const [queryBooks, setQueryBooks] = useState<Book[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SearchBookForm>({
		resolver: yupResolver(searchFormSchema),
	});

	const handleSearchBook = ({ query }: SearchBookForm) => {
		const findBooks = books.filter(book =>
			book.title.toLowerCase().includes(query.toLowerCase()),
		);

		if (findBooks.length <= 0) {
			toast({
				description: 'Nothing found!',
				variant: 'destructive',
			});
			return;
		}

		setQueryBooks(findBooks);
		setIsSearchPopoverOpen(true);
	};

	const handleClosePopover = () => {
		setIsSearchPopoverOpen(false);
	};

	useEffect(() => {
		if (errors.query) {
			toast({
				description: 'Nothing found!',
				variant: 'destructive',
			});
		}
	}, [errors]);

	return (
		<>
			<form
				onSubmit={handleSubmit(handleSearchBook)}
				autoComplete='off'
				className='w-full xs:max-[500px]:h-12 sm:w-96 h-10 bg-secondary-background flex items-center justify-center gap-3 pl-5 rounded-full'
			>
				<IoIosSearch size={25} />
				<input
					type='text'
					placeholder='Search books'
					className='w-full h-full bg-transparent text-span rounded-tr-full rounded-br-full px-3 placeholder:text-placeholder placeholder:text-sm outline-none'
					{...register('query')}
				/>
				<Popover open={isSearchPopoverOpen}>
					<PopoverTrigger />
					<PopoverContent
						onInteractOutside={handleClosePopover}
						className='w-96 text-white bg-secondary-background'
					>
						<header className='w-full flex items-center justify-between'>
							<h3 className='font-bold text-blue'>
								Results ({queryBooks.length})
							</h3>
							<button type='button' onClick={handleClosePopover}>
								<IoMdClose size={18} />
							</button>
						</header>

						<div className='flex flex-col items-center gap-4 mt-4 h-56 p-1 overflow-y-auto books-container'>
							{queryBooks.map(book => (
								<div key={book.id} className='w-full '>
									<Dialog>
										<TBRBookStats book={book} />
										<BookDialog type={book.status} book={book} />
									</Dialog>

									<div className='w-full h-px bg-blue opacity-50 mt-2' />
								</div>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</form>
		</>
	);
};
