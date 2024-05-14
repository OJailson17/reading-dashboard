'use client';

import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { Book } from '@/@types/book';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

const bookStatusLanguageSchema = yup.object({
  status: yup
    .string()
    .oneOf(['To read', 'Reading', 'Finished'])
    .default('To read')
    .required('status is required'),
  language: yup
    .string()
    .oneOf(['Portuguese', 'English', 'Spanish'])
    .default('Portuguese')
    .required('language is required'),
}) as ObjectSchema<Partial<Book>>;

export const BookStatusLanguageForm = () => {
  const { formData, onSetFormData, onHandleNext } = useMultiForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(bookStatusLanguageSchema),
  });

  const handleSaveStatusLanguage = (data: Partial<Book>) => {
    onSetFormData(data);
    onHandleNext();
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(handleSaveStatusLanguage)}
      className="flex flex-col justify-center gap-12"
    >
      <div className="flex w-full items-center justify-between">
        <div className="w-1/2">
          <InputComponent
            {...register('status')}
            error={errors.status}
            label="Status"
            id="book-status"
            isCustom
          >
            <Controller
              name="status"
              control={control}
              defaultValue={'To read'}
              render={({ field: { ref, ...rest } }) => (
                <RadioGroup
                  defaultValue="To read"
                  onValueChange={rest.onChange}
                  {...rest}
                  className="flex flex-col items-start justify-start gap-4 lg:flex-row"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem
                      className="border-white text-white"
                      value="To read"
                      id="To read"
                    />
                    <label className="cursor-pointer" htmlFor="To read">
                      To read
                    </label>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem
                      className="border-white text-white"
                      value="Reading"
                      id="Reading"
                    />
                    <label className="cursor-pointer" htmlFor="Reading">
                      Reading
                    </label>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem
                      className="border-white text-white"
                      value="Finished"
                      id="Finished"
                    />
                    <label className="cursor-pointer" htmlFor="Finished">
                      Finished
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
          </InputComponent>
        </div>

        <div className="1/2">
          <InputComponent
            {...register('language')}
            error={errors.language}
            label="Language"
            id="book-language"
            isCustom
          >
            <Controller
              name="language"
              control={control}
              defaultValue={'Portuguese'}
              render={({ field: { ref, ...rest } }) => (
                <RadioGroup
                  defaultValue="Portuguese"
                  onValueChange={rest.onChange}
                  {...rest}
                  className="flex flex-col items-start justify-start gap-4 lg:flex-row"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem
                      className="border-white text-white"
                      value="Portuguese"
                      id="Portuguese"
                    />
                    <label className="cursor-pointer" htmlFor="Portuguese">
                      Portuguese
                    </label>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem
                      className="border-white text-white"
                      value="English"
                      id="English"
                    />
                    <label className="cursor-pointer" htmlFor="English">
                      English
                    </label>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <RadioGroupItem
                      className="border-white text-white"
                      value="Spanish"
                      id="Spanish"
                    />
                    <label className="cursor-pointer" htmlFor="Spanish">
                      Spanish
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
          </InputComponent>
        </div>
      </div>

      <MultiStepFormActions
        onHandleSubmit={handleSubmit(handleSaveStatusLanguage)}
      />
    </form>
  );
};
