'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TagPicker } from 'rsuite';

import { Book } from '@/@types/book';
import { useMultiForm } from '@/context/MultiFormContext';

import { InputComponent } from '../InputComponent';
import { MultiStepFormActions } from './MultiStepFormActions';

const genreOptions = [
  {
    label: 'Fiction',
    value: 'Fiction',
  },
  {
    label: 'Fantasy',
    value: 'Fantasy',
  },
  {
    label: 'Non-fiction',
    value: 'Non-fiction',
  },
];

export const BookGenresForm = () => {
  const { formData, onSetFormData, onHandleNext } = useMultiForm();

  const { register, handleSubmit, control } = useForm({
    defaultValues: formData,
  });

  const handleSaveGenres = (data: Partial<Book>) => {
    data.genres = data?.genres || [];

    onSetFormData(data);
    onHandleNext();
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(handleSaveGenres)}
      className="flex flex-col justify-center gap-12"
    >
      <div className="flex w-full items-center justify-between">
        <InputComponent
          {...register('genres')}
          label="Genres"
          id="book-genres"
          isCustom
        >
          <Controller
            name="genres"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <TagPicker
                creatable
                data={genreOptions}
                style={{
                  background: '#0e102e',
                  border: 'none',
                  borderRadius: '8px',
                }}
                menuStyle={{ background: '#0E102E' }}
                className="min-h-12 w-full max-w-80 text-base"
                {...rest}
              />
            )}
          />
        </InputComponent>
      </div>

      <MultiStepFormActions onHandleSubmit={handleSubmit(handleSaveGenres)} />
    </form>
  );
};
