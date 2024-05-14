'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdCalendar, IoMdCheckbox } from 'react-icons/io';

import { Book, BookStatus } from '@/@types/book';
import { updateBookDates } from '@/app/actions/updateBookDates';
import { updateBookStatus } from '@/app/actions/updateBookStatus';
import { handleFormatDate, handleRemoveZeroDigit } from '@/utils';

import { Calendar } from '../ui/calendar';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useToast } from '../ui/use-toast';

interface BookDialogProps {
  type: BookStatus;
  book: Book;
}

interface HandleDateProps {
  date: Date;
  date_type: 'started' | 'finished';
}

const bookStatusColor = {
  'To read': 'border-placeholder',
  Reading: 'border-yellow-500',
  Finished: 'border-light-green',
};

const today = format(new Date(), 'yyyy-MM-dd');

export const BookDialog = ({ type = 'To read', book }: BookDialogProps) => {
  const [startedDate, setStartedDate] = useState<Date>(
    new Date(handleRemoveZeroDigit(book.started_date || today)),
  );
  const [finishedDate, setFinishedDate] = useState<Date>(
    new Date(handleRemoveZeroDigit(book.finished_date || today)),
  );
  const [bookStatus, setBookStatus] = useState<BookStatus>(book.status);
  const [isBookStatusUpdating, setIsBookStatusUpdating] = useState(false);
  const [isDateUpdating, setIsDateUpdating] = useState(false);

  const { toast } = useToast();

  const handleSetDate = ({ date, date_type }: HandleDateProps) => {
    if (date_type === 'started') {
      return setStartedDate(date);
    }

    setFinishedDate(date);
  };

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

  const handleUpdateDates = async (isDatePickerOpen: boolean) => {
    // update the date if date picker is closed and a different date was chosen
    if (!isDatePickerOpen) {
      if (
        handleFormatDate(startedDate) !==
          handleFormatDate(new Date(book.started_date || today)) ||
        handleFormatDate(finishedDate) !==
          handleFormatDate(new Date(book.finished_date || today))
      ) {
        setIsDateUpdating(true);

        const bookUpdated = await updateBookDates({
          book_id: book.id,
          started_date: handleFormatDate(startedDate, 'utc'),
          finished_date: handleFormatDate(finishedDate, 'utc'),
        });

        setIsDateUpdating(false);

        if (bookUpdated?.error) {
          return toast({
            description: bookUpdated.error,
            variant: 'destructive',
          });
        }

        toast({
          description: 'Book updated!',
          variant: 'success',
        });
      }
    }
  };

  return (
    <DialogContent className="flex w-[90%] max-w-[450px] flex-col items-center justify-center rounded-3xl border-none bg-background px-9 py-6 xs:px-6">
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
        <div className="relative mt-3 flex w-full items-center justify-center gap-7">
          <Popover onOpenChange={handleUpdateDates}>
            <PopoverTrigger className="flex items-center justify-center gap-2">
              <IoMdCalendar size={18} />
              <span className="text-sm font-light text-span">
                {startedDate
                  ? handleFormatDate(startedDate)
                  : handleFormatDate(new Date())}
              </span>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startedDate}
                onSelect={(e) =>
                  handleSetDate({
                    date: e || new Date(book.started_date || today),
                    date_type: 'started',
                  })
                }
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                defaultMonth={new Date(book.started_date || today)}
                className="border-none bg-secondary-background text-span"
              />
            </PopoverContent>
          </Popover>

          <Popover onOpenChange={handleUpdateDates}>
            <PopoverTrigger className="flex items-center justify-center gap-2">
              <IoMdCheckbox size={18} />
              <span className="text-sm font-light text-span">
                {finishedDate
                  ? handleFormatDate(finishedDate)
                  : handleFormatDate(new Date())}
              </span>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={finishedDate}
                onSelect={(e) =>
                  handleSetDate({
                    date: e || new Date(),
                    date_type: 'finished',
                  })
                }
                defaultMonth={new Date(book.finished_date || today)}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                className="border-none bg-secondary-background text-span outline-none"
              />
            </PopoverContent>
          </Popover>

          {isDateUpdating && (
            <ImSpinner2 className="absolute right-1 animate-spin" />
          )}
        </div>
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
