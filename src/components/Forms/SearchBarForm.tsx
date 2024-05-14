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
    const findBooks = books.filter((book) =>
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
        autoComplete="off"
        className="flex h-10 w-full items-center justify-center gap-3 rounded-full bg-secondary-background pl-5 xs:max-[500px]:h-12 sm:w-96"
      >
        <IoIosSearch size={25} />
        <input
          type="text"
          placeholder="Search books"
          className="h-full w-full rounded-br-full rounded-tr-full bg-transparent px-3 text-span outline-none placeholder:text-sm placeholder:text-placeholder"
          {...register('query')}
        />
        <Popover open={isSearchPopoverOpen}>
          <PopoverTrigger />
          <PopoverContent
            onInteractOutside={handleClosePopover}
            className="w-96 bg-secondary-background text-white"
          >
            <header className="flex w-full items-center justify-between">
              <h3 className="font-bold text-blue">
                Results ({queryBooks.length})
              </h3>
              <button type="button" onClick={handleClosePopover}>
                <IoMdClose size={18} />
              </button>
            </header>

            <div className="books-container mt-4 flex h-56 flex-col items-center gap-4 overflow-y-auto p-1">
              {queryBooks.map((book) => (
                <div key={book.id} className="w-full ">
                  <Dialog>
                    <TBRBookStats book={book} />
                    <BookDialog type={book.status} book={book} />
                  </Dialog>

                  <div className="mt-2 h-px w-full bg-blue opacity-50" />
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </form>
    </>
  );
};
