'use client';

import Link from 'next/link';

import { Book } from '@/@types/book';
import { applicationLinks } from '@/utils/constants/links';

import { EmptyCard } from '../EmptyCard';
import { Drawer } from '../ui/drawer';
import { ReadingBookStats } from './ReadingBookStats';
import { UpdateReadingDialog } from './UpdateReadingDialog';

interface ReadingCardProps {
  books: Book[];
}

interface SortByProgressProps {
  readingBooks: Book[];
}

const calculatePercentage = (total: number, current: number) => {
  return Math.round((current / total) * 100);
};

// Get a list of books and sort by progress Desc
const sortByProgress = ({ readingBooks }: SortByProgressProps) => {
  return readingBooks.slice().sort((a, b) => {
    const progressA = calculatePercentage(a.total_pages, a.current_page);
    const progressB = calculatePercentage(b.total_pages, b.current_page);
    return progressB - progressA;
  });
};

export const ReadingCard = ({ books }: ReadingCardProps) => {
  const readingBooks = books.filter((book) => book.status === 'Reading');

  // sort book by progress Desc
  const booksByProgress = sortByProgress({ readingBooks });

  return (
    <div className="h-96 w-full max-w-[403px] rounded-2xl bg-secondary-background py-6 xs:px-4 sm:px-7">
      <header className="flex items-end justify-between">
        <h2 className="text-xl font-bold">Currently Reading</h2>
        <Link
          href={`${applicationLinks.bookshelf}/?tab=reading`}
          className="text-sm text-span hover:underline"
        >
          see all
        </Link>
      </header>

      {!readingBooks || readingBooks.length <= 0 ? (
        <EmptyCard />
      ) : (
        <div className="books-container mt-9 h-60 space-y-6 overflow-y-auto py-1 pl-1 pr-3">
          {booksByProgress.map((book, i) => (
            <Drawer key={book.id}>
              <ReadingBookStats book={book} />
              <UpdateReadingDialog book={book} />
            </Drawer>
          ))}
        </div>
      )}
    </div>
  );
};
