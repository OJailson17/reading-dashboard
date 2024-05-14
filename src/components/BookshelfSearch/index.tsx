'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import * as yup from 'yup';

import { applicationLinks } from '@/utils/constants/links';
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
      return router.push(`${applicationLinks.bookshelf}/?tab=all`, {
        scroll: false,
      });
    }

    return router.push(`${applicationLinks.bookshelf}/?tab=all&q=${query}`, {
      scroll: false,
    });
  };

  const handleResetSearch = () => {
    resetField('query');

    router.push(`${applicationLinks.bookshelf}/?tab=all`, {
      scroll: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      autoComplete="off"
      className="flex h-10 w-full shrink-0 items-center justify-center gap-3 rounded-full bg-background px-5 xs:max-[500px]:h-12 sm:w-80"
    >
      <IoIosSearch size={25} />

      <input
        type="text"
        placeholder="Search books"
        className="h-full w-full max-w-72 bg-transparent px-3 text-span outline-none placeholder:text-sm placeholder:text-placeholder"
        {...register('query')}
      />

      {queryFieldWatch && queryFieldWatch.length > 0 ? (
        <button
          onClick={handleResetSearch}
          className="rounded-sm border-none bg-transparent"
          type="button"
        >
          <IoCloseOutline size={20} />
        </button>
      ) : (
        <div className="h-5 w-5 bg-transparent" />
      )}
    </form>
  );
};
