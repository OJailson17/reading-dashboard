/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';

import { Book } from '@/@types/book';
import { useMultiForm } from '@/context/MultiFormContext';

import { BookDialog } from '../BookDialog';
import { Dialog } from '../ui/dialog';
import { BookTableRow } from './BookTableRow';

interface BookShelfTableProps {
  books: Book[];
}

export const BookShelfTable = ({ books }: BookShelfTableProps) => {
  const { onResetForm } = useMultiForm();

  // Reset create book form after being submitted
  useEffect(() => {
    onResetForm();
  }, []);

  if (books.length <= 0) {
    return (
      <p className="text-center text-lg font-bold text-span">
        There is nothing here
      </p>
    );
  }

  return (
    <table className="bookshelf-table w-full table-auto border-separate border-spacing-y-3 px-1">
      <thead>
        <tr className="text-center text-span">
          <th className="text-left">Book Details</th>
          <th className="max-sm:hidden">Status</th>
          <th className="max-sm:hidden">Genres</th>
          <th className="max-sm:hidden">Started</th>
          <th className="max-sm:hidden">Finished</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <Dialog key={book.id}>
            <BookTableRow book={book} />
            <BookDialog type={book.status} book={book} />
          </Dialog>
        ))}
      </tbody>
    </table>
  );
};
