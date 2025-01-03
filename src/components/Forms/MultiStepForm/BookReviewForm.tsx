'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { Book } from '@/@types/book';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMultiForm } from '@/context/MultiFormContext';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputComponent } from '../InputComponent';
import { MultiStepFormActions } from './MultiStepFormActions';

interface BookReviewForm {
  user_database_id: string;
}

const ratingOptions = [
  {
    label: ' ⭐️ ',
    value: 'b76a9fe1-b636-47b3-ab49-a264ee49d4f9',
  },
  {
    label: ' ⭐ ⭐ ',
    value: 'b04af175-1da7-4910-90de-05323b8d84de',
  },
  {
    label: ' ⭐ ⭐ ⭐ ',
    value: 'ce75ca4c-ce00-4d64-a2a4-88fa0e8de252',
  },
  {
    label: ' ⭐ ⭐ ⭐ ⭐ ',
    value: '37bf3f5a-74c7-42d1-a5a3-2a08d6f258dd',
  },
  {
    label: ' ⭐ ⭐ ⭐ ⭐ ⭐ ',
    value: '71a79313-505a-4c38-a050-ee28f9ea3fe4',
  },
  {
    label: 'none',
    value: '90de4911-f67a-44bf-893e-3aeddb3e3e1e',
  },
];

const goodreadsOptions = [
  //goodreads
  {
    label: ' ⭐️ ',
    value: '657f34f5-548c-4965-83b1-036a7927fc4b',
  },
  {
    label: ' ⭐ ⭐ ',
    value: '6de63a3d-6efe-4ace-a866-dae14f53d9bd',
  },
  {
    label: ' ⭐ ⭐ ⭐ ',
    value: '7ae6ef66-f223-4ca6-9db7-1a8d59b24d18',
  },
  {
    label: ' ⭐ ⭐ ⭐ ⭐ ',
    value: 'f9ba4d94-4bcb-4453-b99f-78316a97cd87',
  },
  {
    label: ' ⭐ ⭐ ⭐ ⭐ ⭐ ',
    value: 'f02396d5-e2b5-4119-bc7c-58d6a31d53cc',
  },
  {
    label: 'none',
    value: 'd5dc3000-0846-4c4f-970a-64202b433a16',
  },
];

const bookReviewSchema = yup.object({
  review: yup.string().trim().optional().default(ratingOptions[5].value),
  goodreads: yup.string().trim().required('goodreads review is required'),
}) as ObjectSchema<Partial<Book>>;

export const BookReviewForm = ({ user_database_id }: BookReviewForm) => {
  const [isReviewSelectOpen, setIsReviewSelectOPen] = useState(false);

  const { formData, onSetFormData, onHandleNext } = useMultiForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(bookReviewSchema),
  });

  const handleSaveReview = (data: Partial<Book>) => {
    onSetFormData(data);
    onHandleNext();
  };

  const demoDatabaseId = process.env.NEXT_PUBLIC_DEMO_DATABASE_ID;
  const IS_DEMO_VERSION = user_database_id === demoDatabaseId;

  const bookStatus = formData.status || 'To read';

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(handleSaveReview)}
      className="flex flex-col justify-center gap-12"
    >
      <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <InputComponent
          {...register('goodreads')}
          error={errors.goodreads}
          label="Goodreads"
          id="book-goodreads"
          isCustom
        >
          <Controller
            name="goodreads"
            control={control}
            defaultValue={
              IS_DEMO_VERSION
                ? ratingOptions[5].value
                : goodreadsOptions[5].value
            }
            render={({ field: { ref, ...rest } }) => (
              <Select
                onValueChange={rest.onChange}
                {...rest}
                onOpenChange={(e) => setIsReviewSelectOPen(e)}
              >
                <SelectTrigger className="h-12 max-w-80 rounded-md border-none bg-background text-white outline-none">
                  <SelectValue placeholder="Goodreads review" />
                </SelectTrigger>

                <SelectContent className="bg-background">
                  <SelectGroup className="bg-background text-span">
                    {IS_DEMO_VERSION &&
                      ratingOptions.map((review) => (
                        <SelectItem
                          key={review.value}
                          value={review.value}
                          className="max-sm:h-11"
                        >
                          {review.label}
                        </SelectItem>
                      ))}

                    {!IS_DEMO_VERSION &&
                      goodreadsOptions.map((review) => (
                        <SelectItem
                          key={review.value}
                          value={review.value}
                          className="max-sm:h-11"
                        >
                          {review.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </InputComponent>

        {bookStatus === 'Finished' && (
          <InputComponent
            {...register('review')}
            error={errors.review}
            label="Review"
            id="book-review"
            isCustom
          >
            <Controller
              name="review"
              control={control}
              defaultValue={ratingOptions[5].value}
              render={({ field: { ref, ...rest } }) => (
                <Select
                  onValueChange={rest.onChange}
                  {...rest}
                  onOpenChange={(e) => setIsReviewSelectOPen(e)}
                >
                  <SelectTrigger className="h-12 w-full max-w-80 rounded-md border-none bg-background text-white outline-none">
                    <SelectValue placeholder="Make a review" />
                  </SelectTrigger>

                  <SelectContent className="bg-background">
                    <SelectGroup className="bg-background text-span">
                      {ratingOptions.map((review) => (
                        <SelectItem
                          key={review.value}
                          value={review.value}
                          className="select-none max-sm:h-11"
                        >
                          {review.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </InputComponent>
        )}
      </div>

      <MultiStepFormActions
        removeEvents={isReviewSelectOpen}
        onHandleSubmit={handleSubmit(handleSaveReview)}
      />
    </form>
  );
};
