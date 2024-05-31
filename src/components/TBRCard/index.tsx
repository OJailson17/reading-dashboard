import Link from 'next/link';

import { Book } from '@/@types/book';
import { applicationLinks } from '@/utils/constants/links';

import { BookDialog } from '../BookDialog';
import { EmptyCard } from '../EmptyCard';
import { Dialog } from '../ui/dialog';
import { TBRBookStats } from './TBRBookStats';

interface TBRCardProps {
  books: Book[];
}

export const TBRCard = async ({ books }: TBRCardProps) => {
  const TBRBooks = books
    .filter((book) => book.status === 'To read')
    .slice(0, 5);

  return (
    <div className="h-96 w-full max-w-[403px] rounded-2xl bg-secondary-background py-6 xs:px-4 sm:px-7">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Want to Read</h2>
        <Link
          href={`${applicationLinks.bookshelf}/?tab=tbr`}
          className="text-sm text-span hover:underline"
        >
          see all
        </Link>
      </header>

      {!books || books.length <= 0 ? (
        <EmptyCard />
      ) : (
        <div className="books-container mt-9 h-60 space-y-6 overflow-y-auto py-1 pl-1 pr-3">
          {TBRBooks.map((book) => (
            <Dialog key={book.id}>
              <TBRBookStats book={book} />
              <BookDialog type="To read" book={book} />
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};
