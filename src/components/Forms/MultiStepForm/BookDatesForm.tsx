'use client';

import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { FaFaceSmileBeam } from 'react-icons/fa6';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { Book } from '@/@types/book';
import { createBook } from '@/app/actions/createBook';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { useMultiForm } from '@/context/MultiFormContext';
import { removePriceFormat } from '@/utils';
import { applicationLinks } from '@/utils/constants/links';
import { handleFormatDate } from '@/utils/formatting/formatDate';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiStepFormActions } from './MultiStepFormActions';

interface BookDatesProps {
  user_database_id: string;
}

const bookDatesSchema = yup.object({
  started_date: yup
    .string()
    .trim()
    .when('status', {
      is: (value: string) => value === 'Reading' || value === 'Finished',
      then: (schema) => schema.required('started date is required'),
      otherwise: (schema) => schema.nullable(),
    }),
  finished_date: yup
    .string()
    .trim()
    .when('status', {
      is: 'Finished',
      then: (schema) => schema.required('finished date is required'),
      otherwise: (schema) => schema.nullable(),
    }),
}) as ObjectSchema<Partial<Book>>;

const statusTab = {
  'To read': 'tbr',
  Reading: 'reading',
  Finished: 'finished',
};

export const BookDatesForm = ({ user_database_id }: BookDatesProps) => {
  const { formData } = useMultiForm();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(bookDatesSchema),
  });

  const router = useRouter();

  const handleCreateBook = async (data: Partial<Book>) => {
    const book = handleFormatBook(data);

    await createBook({
      book,
      database_id: user_database_id,
    })
      .then((response) => {
        if (response?.error) {
          console.log(response);

          return toast({
            description: 'Error: Book not created',
            variant: 'destructive',
          });
        }

        toast({
          description: 'Book Created',
          variant: 'success',
        });

        setTimeout(() => {
          router.push(
            `${applicationLinks.bookshelf}/?tab=${
              statusTab[data.status || 'To read']
            }`,
          );
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        return toast({
          description: err,
          variant: 'destructive',
        });
      });
  };

  const handleSelectDate = (date: Date, onChange: any) => {
    const formattedDate = handleFormatDate(date, 'utc');
    onChange(formattedDate);
  };

  const handleFormatBook = (book: Partial<Book>) => {
    book.book_price = removePriceFormat(book.book_price || '');

    if (book.status === 'Finished') {
      book.current_page = book.total_pages;
    }

    return book;
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(handleCreateBook)}
      className="flex flex-col justify-center gap-12"
    >
      <div className="flex w-full flex-col items-start justify-between max-lg:gap-6 lg:flex-row lg:items-center">
        {formData.status === 'To read' && (
          <div className="space-y-4">
            <p className="flex items-center justify-center gap-2">
              All the information was filled
              <FaFaceSmileBeam />
            </p>
            <p>
              Click on <strong>Create</strong> to confirm
            </p>
          </div>
        )}

        {formData.status === 'Reading' || formData.status === 'Finished' ? (
          <div className="w-full">
            <InputComponent
              id="started_date"
              label="Started Date"
              error={errors.started_date}
              isCustom
            >
              <Controller
                name="started_date"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="w-full cursor-pointer rounded-md bg-background px-4 py-3 text-span">
                        {value ? value : 'Pick a date'}
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date()}
                        onSelect={(e) =>
                          handleSelectDate(e || new Date(), onChange)
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        className="border-none bg-secondary-background text-span"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </InputComponent>
          </div>
        ) : null}

        {formData.status === 'Finished' && (
          <div className="w-full">
            <InputComponent
              id="finished_date"
              label="Finished Date"
              error={errors.finished_date}
              isCustom
            >
              <Controller
                name="finished_date"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="w-full cursor-pointer rounded-md bg-background px-4 py-3 text-span">
                        {value ? value : 'Pick a date'}
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date()}
                        onSelect={(e) =>
                          handleSelectDate(e || new Date(), onChange)
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        className="border-none bg-secondary-background text-span"
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </InputComponent>
          </div>
        )}
      </div>

      <MultiStepFormActions
        onHandleSubmit={handleSubmit(handleCreateBook)}
        isLoading={isSubmitting}
      />
    </form>
  );
};
