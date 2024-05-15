import Image from 'next/image';
import Link from 'next/link';

import { Book } from '@/@types/book';
import { applicationLinks } from '@/utils/constants/links';

import { BookDialog } from '../BookDialog';
import { Dialog, DialogTrigger } from '../ui/dialog';

interface FinishedCardProps {
  books: Book[];
}

export const FinishedCard = ({ books }: FinishedCardProps) => {
  const finishedBooks = books
    .filter((book) => book.status === 'Finished')
    .slice(0, 5);

  return (
    <div className="min-h-[314px] w-full rounded-2xl bg-secondary-background py-6 xs:px-4 sm:col-span-2 sm:px-7">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Just Finished</h2>
        <Link
          href={`${applicationLinks.bookshelf}/?tab=finished`}
          className="text-sm text-span hover:underline"
        >
          see all
        </Link>
      </header>

      <div className="books-container mt-10 flex gap-6 overflow-x-auto overflow-y-hidden px-1 pb-6 pt-1 sm:w-full lg:max-w-[320px]">
        {finishedBooks.map((book) => (
          <Dialog key={book.id}>
            <DialogTrigger className="h-40 min-w-28 rounded-md">
              {book.cover_url !== '' && (
                <div className="relative h-full w-full">
                  <Image
                    src={book.cover_url}
                    alt={`${book.title} cover`}
                    fill
                    priority
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              {book.cover_url === '' && (
                <div className="flex h-full w-28 items-center justify-center overflow-y-hidden break-words rounded-md bg-background p-px text-center text-xs">
                  {book.title}
                </div>
              )}
            </DialogTrigger>
            <BookDialog type="Finished" book={book} />
          </Dialog>
        ))}
      </div>
    </div>
  );
};
