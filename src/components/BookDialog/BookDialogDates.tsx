'use client';

import { useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdCalendar, IoMdCheckbox } from 'react-icons/io';
import { format } from 'util';

import { updateBookDates } from '@/app/actions/updateBookDates';
import { handleFormatDate, handleRemoveZeroDigit } from '@/utils';

import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { toast } from '../ui/use-toast';

interface HandleDateProps {
  date: Date;
  date_type: 'started' | 'finished';
}

interface BookDialogDatesProps {
  bookStartedDate: string | null;
  bookFinishedDate: string | null;
  bookId: string;
}

const today = format(new Date(), 'yyyy-MM-dd');

export const BookDialogDates = ({
  bookStartedDate,
  bookFinishedDate,
  bookId,
}: BookDialogDatesProps) => {
  const [startedDate, setStartedDate] = useState<Date>(
    new Date(handleRemoveZeroDigit(bookStartedDate || today)),
  );
  const [finishedDate, setFinishedDate] = useState<Date>(
    new Date(handleRemoveZeroDigit(bookFinishedDate || today)),
  );
  const [isDateUpdating, setIsDateUpdating] = useState(false);

  const handleUpdateDates = async (isDatePickerOpen: boolean) => {
    // update the date if date picker is closed and a different date was chosen
    if (!isDatePickerOpen) {
      if (
        handleFormatDate(startedDate) !==
          handleFormatDate(new Date(bookStartedDate || today)) ||
        handleFormatDate(finishedDate) !==
          handleFormatDate(new Date(bookFinishedDate || today))
      ) {
        setIsDateUpdating(true);

        const bookUpdated = await updateBookDates({
          book_id: bookId,
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

  const handleSetDate = ({ date, date_type }: HandleDateProps) => {
    if (date_type === 'started') {
      return setStartedDate(date);
    }

    setFinishedDate(date);
  };

  return (
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
                date: e || new Date(bookStartedDate || today),
                date_type: 'started',
              })
            }
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            defaultMonth={new Date(bookStartedDate || today)}
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
            defaultMonth={new Date(bookFinishedDate || today)}
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
  );
};
