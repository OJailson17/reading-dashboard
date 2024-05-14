import { format } from 'date-fns';
import Image from 'next/image';
import { IoStar } from 'react-icons/io5';

import { Book } from '@/@types/book';
import { handleRemoveZeroDigit } from '@/utils';
import { calculateAmountOfRatingStars } from '@/utils';

import { DialogTrigger } from '../ui/dialog';

interface BookTableRowProps {
  book: Book;
}

const bookStatusColor = {
  'To read': 'border-placeholder',
  Reading: 'border-yellow-500',
  Finished: 'border-light-green',
};

export const BookTableRow = ({ book }: BookTableRowProps) => {
  const getFirstTwoGenres = book.genres.filter((_, i) => i <= 1);

  let startedYear: string | null = null;
  let finishedYear: string | null = null;

  if (book.started_date) {
    startedYear = book.started_date.split('-')[0];
  }

  if (book.finished_date) {
    finishedYear = book.finished_date.split('-')[0];
  }

  const { amountOfGrayStars, amountOfYellowStars } =
    calculateAmountOfRatingStars(
      book.review && book.review !== 'none' ? book.review.length : 0,
    );

  return (
    <tr>
      {/* Details */}
      <td>
        <DialogTrigger className="flex items-center gap-4">
          {book.cover_url !== '' && (
            <div className="relative h-24 min-w-16 rounded-md">
              <Image
                src={book.cover_url}
                alt={`cover`}
                fill
                priority
                className="rounded-md object-cover"
              />
            </div>
          )}
          {book.cover_url === '' && (
            <div className="flex h-24 w-16 items-center justify-center overflow-y-hidden break-words rounded-md bg-background p-px text-center text-xs">
              {book.title}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="max-w-60 text-left">
              <p className="ellipsis-title break-words font-bold">
                {book.title}
              </p>
              <span className="text-xs font-bold text-span">{book.author}</span>
            </div>

            <div className="flex items-center gap-1">
              {[...new Array(amountOfYellowStars)].map((_, i) => (
                <IoStar key={i} fill="yellow" />
              ))}
              {[...new Array(amountOfGrayStars)].map((_, i) => (
                <IoStar key={i} fill="gray" />
              ))}
            </div>
          </div>
        </DialogTrigger>
      </td>

      {/* Status */}
      <td className="max-sm:hidden">
        <div
          className={`max-h-6 border-[1.5px] font-light text-white ${
            bookStatusColor[book.status]
          } mx-auto flex w-[90%] max-w-40 items-center justify-center rounded-md px-2 py-3 text-center text-sm`}
        >
          {book.status}
        </div>
      </td>

      {/* Genres */}
      <td className="space-y-2 max-sm:hidden">
        {getFirstTwoGenres.map((genre) => (
          <div
            key={genre.name}
            className="mx-auto flex max-h-6 w-[90%] max-w-40 items-center justify-center rounded-md border-[1.5px] border-purple px-2 py-3 text-center text-sm font-light text-white"
          >
            {genre.name}
          </div>
        ))}
      </td>

      {/* Started */}
      <td className="max-sm:hidden">
        <div className="text-center">
          <p className="text-xs font-bold">
            {book.started_date
              ? format(
                  new Date(handleRemoveZeroDigit(book.started_date)),
                  'MMM dd',
                )
              : 'Not Set'}
          </p>
          <span className="text-xs font-bold text-span">{startedYear}</span>
        </div>
      </td>

      {/* Finished */}
      <td className="max-sm:hidden">
        <div className="text-center">
          <p className="text-xs font-bold">
            {book.finished_date
              ? format(
                  new Date(handleRemoveZeroDigit(book.finished_date)),
                  'MMM dd',
                )
              : 'Not Set'}
          </p>
          <span className="text-xs font-bold text-span">{finishedYear}</span>
        </div>
      </td>
    </tr>
  );
};
