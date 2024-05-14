'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useMultiForm } from '@/context/MultiFormContext';
import { handleFormatCoverURL } from '@/utils';

const bookStatusColor = {
  'To read': 'border-placeholder',
  Reading: 'border-yellow-500',
  Finished: 'border-light-green',
};

export const BookCreationPreview = () => {
  const { formData } = useMultiForm();

  const [book, setBook] = useState(formData);

  useEffect(() => {
    if (formData.cover_url) {
      formData.cover_url = handleFormatCoverURL(formData.cover_url || '');
    }

    setBook(formData);
  }, [formData]);

  return (
    <div className="flex min-h-80 w-full max-w-96 flex-col items-center justify-center gap-2 rounded-2xl bg-secondary-background px-2 py-4 sm:max-lg:w-80">
      {/* Cover */}
      <div className="flex h-40 w-28 items-center justify-center rounded-md bg-background text-center">
        {book.cover_url && book.cover_url !== '' ? (
          <div className="relative h-full w-full">
            <Image
              src={book.cover_url || ''}
              alt={'Book Cover'}
              fill
              priority
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <p className="text-xs">{book.title}</p>
        )}
      </div>

      {/* Title */}
      {book.title ? (
        <p className="ellipsis-title max-w-52 break-words text-center font-medium">
          {book.title}
        </p>
      ) : (
        <div className="h-6 w-full max-w-52 rounded-md bg-background" />
      )}

      {/* Author */}
      {book.author ? (
        <p className="ellipsis-title max-w-52 break-words text-center text-span">
          {book.author}
        </p>
      ) : (
        <div className="h-6 w-full max-w-36 rounded-md bg-background" />
      )}

      {/* Status/Rating */}
      <div className="flex w-full max-w-52 items-center justify-center gap-2">
        {book.status ? (
          <div
            className={`max-h-6 border-[1.5px] font-light text-white ${
              bookStatusColor[book.status]
            } mx-auto flex w-[90%] max-w-40 items-center justify-center rounded-md px-2 py-3 text-center text-sm`}
          >
            {book.status}
          </div>
        ) : (
          <div className="h-6 w-full rounded-md bg-background" />
        )}

        {/* Totaç pages */}
        {book.total_pages ? (
          <div className="flex h-6 w-20 items-center justify-center gap-1">
            <p className="font-light text-span">{book.total_pages} p</p>
          </div>
        ) : (
          <div className="h-6 w-16 rounded-md bg-background" />
        )}
      </div>
    </div>
  );
};
