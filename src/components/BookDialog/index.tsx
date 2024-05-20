'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { Book, BookStatus } from '@/@types/book';
import { updateBookStatus } from '@/app/actions/updateBookStatus';
import { storageStrings } from '@/utils';

import { DialogContent, DialogTitle } from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useToast } from '../ui/use-toast';
import { BookDialogDates } from './BookDialogDates';
import { BookDialogSummarizer } from './BookDialogSummarizer';

interface BookDialogProps {
  type: BookStatus;
  book: Book;
}

const bookStatusColor = {
  'To read': 'border-placeholder',
  Reading: 'border-yellow-500',
  Finished: 'border-light-green',
};

export const BookDialog = ({ type = 'To read', book }: BookDialogProps) => {
  const [bookStatus, setBookStatus] = useState<BookStatus>(book.status);
  const [isBookStatusUpdating, setIsBookStatusUpdating] = useState(false);
  const [isSummaryEnabled, setIsSummaryEnabled] = useState(false);

  const { toast } = useToast();

  const handleUpdateStatus = async (isStatusModalOpen: boolean) => {
    if (!isStatusModalOpen && bookStatus !== book.status) {
      setIsBookStatusUpdating(true);

      // if it's reading set started date to today
      if (bookStatus === 'To read') {
        const updatedStatus = await updateBookStatus({
          status: 'To read',
          book,
        });

        if (updatedStatus?.error) {
          setIsBookStatusUpdating(false);

          return toast({
            description: updatedStatus.error,
            variant: 'destructive',
          });
        }
      }

      // if it's reading set started date to today
      if (bookStatus === 'Reading') {
        const updatedStatus = await updateBookStatus({
          status: 'Reading',
          book,
        });

        if (updatedStatus?.error) {
          setIsBookStatusUpdating(false);

          return toast({
            description: updatedStatus.error,
            variant: 'destructive',
          });
        }
      }

      // if it's Finished set Finished date to today
      if (bookStatus === 'Finished') {
        const updatedStatus = await updateBookStatus({
          status: 'Finished',
          book: {
            ...book,
            current_page: book.total_pages,
          },
        });

        if (updatedStatus?.error) {
          setIsBookStatusUpdating(false);

          return toast({
            description: updatedStatus.error,
            variant: 'destructive',
          });
        }
      }

      toast({
        description: 'Book updated!',
        variant: 'success',
      });

      setIsBookStatusUpdating(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem(storageStrings.username);

    if (username && username !== 'demo_user') {
      setIsSummaryEnabled(true);
    }
  }, []);

  return (
    <DialogContent className="flex w-[90%] max-w-[450px] flex-col items-center justify-center rounded-3xl border-none bg-background px-9 py-6 xs:px-6">
      {isSummaryEnabled && (
        <BookDialogSummarizer bookAuthor={book.author} bookTitle={book.title} />
      )}

      <DialogTitle className="mt-5 text-center text-lg font-semibold">
        {book.title}
      </DialogTitle>

      <div className="mt-4 h-40 w-full max-w-28 rounded-md">
        {book.cover_url !== '' && (
          <div className="relative h-full">
            <Image
              src={book.cover_url}
              alt="book cover"
              fill
              className="rounded-md object-cover"
              priority
            />
          </div>
        )}
        {book.cover_url === '' && (
          <div className="flex h-full w-full items-center justify-center overflow-y-hidden break-words rounded-2xl bg-secondary-background p-px text-center text-xs">
            {book.title}
          </div>
        )}
      </div>

      {type === 'Finished' && (
        <BookDialogDates
          bookFinishedDate={book.finished_date}
          bookStartedDate={book.started_date}
          bookId={book.id}
        />
      )}

      <div className="mt-4 flex w-full flex-col space-y-3">
        <div className="space-x-3">
          <p className="inline-block">Author:</p>
          <span className="font-light text-span">{book.author}</span>
        </div>
        <div className="space-x-3">
          <p className="inline-block">Pages:</p>
          <span className="font-light text-span">{book.total_pages}</span>
        </div>
        <div className="flex items-center space-x-3">
          <p className="inline-block">Status:</p>
          <Popover onOpenChange={handleUpdateStatus}>
            <PopoverTrigger
              className={`font-light text-span ${bookStatusColor[bookStatus]} flex min-h-6 min-w-20 items-center justify-center rounded-md border-[1px] px-2 text-center`}
            >
              {isBookStatusUpdating ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                bookStatus.toUpperCase()
              )}
            </PopoverTrigger>
            <PopoverContent
              // onInteractOutside={handleUpdateStatus}
              className="flex w-80 items-center justify-center gap-5 bg-secondary-background"
            >
              <div className="flex cursor-pointer items-center justify-center gap-2">
                <input
                  type="radio"
                  id="to-read-status"
                  name="status"
                  value="To read"
                  checked={bookStatus === 'To read'}
                  onChange={() => setBookStatus('To read')}
                />
                <label htmlFor="to-read-status" className="text-sm text-span">
                  To Read
                </label>
              </div>
              <div className="flex cursor-pointer items-center justify-center gap-2">
                <input
                  type="radio"
                  id="reading-status"
                  name="status"
                  value="Reading"
                  checked={bookStatus === 'Reading'}
                  onChange={() => setBookStatus('Reading')}
                />
                <label htmlFor="reading-status" className="text-sm text-span">
                  Reading
                </label>
              </div>
              <div className="flex cursor-pointer items-center justify-center gap-2">
                <input
                  type="radio"
                  id="Finished-status"
                  name="status"
                  value="Finished"
                  checked={bookStatus === 'Finished'}
                  onChange={() => setBookStatus('Finished')}
                />
                <label htmlFor="Finished-status" className="text-sm text-span">
                  Finished
                </label>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-x-3">
          {type === 'To read' || type === 'Reading' ? (
            <>
              <p className="inline-block">Goodreads:</p>
              <span className="font-light text-span">{book?.goodreads}</span>
            </>
          ) : (
            <>
              <p className="inline-block">Review:</p>
              <span className="font-light text-span">{book?.review}</span>
            </>
          )}
        </div>
      </div>
    </DialogContent>
  );
};
