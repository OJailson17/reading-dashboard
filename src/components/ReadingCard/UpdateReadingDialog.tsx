'use client';

import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import * as yup from 'yup';

import { Book } from '@/@types/book';
import { updateBookPage } from '@/app/actions/updateBookPage';
import { updateBookStatus } from '@/app/actions/updateBookStatus';
import { yupResolver } from '@hookform/resolvers/yup';

import { BookDialog } from '../BookDialog';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { DrawerContent, DrawerHeader } from '../ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';

interface UpdateReadingDialog {
  book: Book;
}

const readingFormSchema = yup.object({
  current_page: yup
    .number()
    .min(0, 'it needs to be 0 or more')
    .required('field required!')
    .typeError('value needs to be a number'),
  status: yup
    .string()
    .oneOf(['To read', 'Reading', 'Finished'])
    .required('field required!'),
});

type UpdateReadingFormProps = yup.InferType<typeof readingFormSchema>;

export const UpdateReadingDialog = ({ book }: UpdateReadingDialog) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<UpdateReadingFormProps>({
    resolver: yupResolver(readingFormSchema),
  });

  const { toast } = useToast();

  // Update book status and current page
  const handleUpdateBook = async ({
    current_page,
    status,
  }: UpdateReadingFormProps) => {
    // just return if page and status didn't change
    if (
      String(current_page) === String(book.current_page) &&
      status === book.status
    ) {
      return;
    }

    const activeElement = document.activeElement as HTMLInputElement;
    activeElement.blur();

    if (status === 'To read') {
      const updatedStatus = await updateBookStatus({
        status: 'To read',
        book,
      });

      if (updatedStatus?.error) {
        return toast({
          description: updatedStatus.error,
          variant: 'destructive',
        });
      }
    }

    // define as finished if status is finished or current page is more than total pages
    if (status === 'Finished' || current_page >= book.total_pages) {
      const updatedStatus = await updateBookStatus({
        status: 'Finished',
        book: {
          ...book,
          current_page: book.total_pages,
        },
      });

      if (updatedStatus?.error) {
        return toast({
          description: updatedStatus.error,
          variant: 'destructive',
        });
      }
    }

    const pageUpdated = await updateBookPage({
      book_id: book.id,
      current_page: String(current_page) || String(book.current_page),
    });

    if (pageUpdated?.error) {
      return toast({
        description: pageUpdated.error,
        variant: 'destructive',
      });
    }

    toast({
      description: 'Book updated!',
      variant: 'success',
    });

    // resetField('current_page');
  };

  return (
    <DrawerContent
      // onInteractOutside={() => resetField('current_page')}
      className="border-none bg-secondary-background outline-none"
    >
      <DrawerHeader className="h-ful relative w-full">
        <div className="absolute -top-20 left-1/2 h-40 w-28 -translate-x-1/2 rounded-2xl">
          {book.cover_url !== '' && (
            <Image
              src={book.cover_url}
              alt="book cover"
              fill
              className="rounded-2xl object-contain"
              priority
            />
          )}
          {book.cover_url === '' && (
            <div className="flex h-full w-full items-center justify-center overflow-y-hidden break-words rounded-2xl bg-background p-px text-center text-xs">
              {book.title}
            </div>
          )}
        </div>
        <div className="mt-20 flex items-center justify-center gap-4">
          <span className="font-light text-span">{book.total_pages} p</span>
          <Dialog>
            <DialogTrigger className="cursor-pointer font-light text-blue">
              details
            </DialogTrigger>
            <BookDialog type="Reading" book={book} />
          </Dialog>
        </div>
      </DrawerHeader>

      <form
        className="mb-6 mt-4 flex flex-col items-center justify-center gap-6"
        autoComplete="off"
        onSubmit={handleSubmit(handleUpdateBook)}
      >
        <div className="flex flex-col justify-center gap-1 text-span">
          <label htmlFor="current-page">current page:</label>
          <input
            type="number"
            placeholder={String(book.current_page)}
            className="h-9 w-60 rounded-md bg-background px-4 max-sm:h-11 max-sm:w-72"
            {...register('current_page', {
              valueAsNumber: true,
              value: book.current_page || 0,
            })}
          />
          <span className="mt-1 text-sm text-red-400">
            {errors.current_page?.message}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-1 text-span">
          <label htmlFor="current-page">status:</label>
          <Controller
            name="status"
            control={control}
            defaultValue={book.status}
            render={({ field: { ref, ...rest } }) => (
              <Select onValueChange={rest.onChange} {...rest}>
                <SelectTrigger className="w-60 max-sm:h-11 max-sm:w-72">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup className="bg-background text-span">
                    <SelectItem value="To read" className="max-sm:h-11">
                      To read
                    </SelectItem>
                    <SelectItem value="Reading" className="max-sm:h-11">
                      Reading
                    </SelectItem>
                    <SelectItem value="Finished" className="max-sm:h-11">
                      Finished
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <button
          className="flex h-9 w-60 items-center justify-center rounded-md bg-purple text-sm font-medium max-sm:h-11 max-sm:w-72"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ImSpinner2 className="animate-spin text-white" />
          ) : (
            <p>save</p>
          )}
        </button>
      </form>
    </DrawerContent>
  );
};
