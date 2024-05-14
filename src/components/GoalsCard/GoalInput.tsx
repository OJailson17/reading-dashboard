'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from '../ui/use-toast';

interface GoalInputProps {
  label: string;
  placeholder: string;
  onSetGoal: (goal: string) => Promise<void>;
}

const goalInputValidation = yup.object({
  goal: yup
    .number()
    .min(0, 'it needs to be 0 or more')
    .required('field required!')
    .typeError('it needs to be a number'),
});

type GoalFormProps = yup.InferType<typeof goalInputValidation>;

export const GoalInput = ({
  label,
  onSetGoal,
  placeholder,
}: GoalInputProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormProps>({
    resolver: yupResolver(goalInputValidation),
  });

  const handleSetGoal = async ({ goal }: GoalFormProps) => {
    await onSetGoal(String(goal));
    resetField('goal');
  };

  useEffect(() => {
    if (errors.goal)
      toast({
        description: errors.goal.message,
        variant: 'destructive',
      });
  }, [errors]);

  return (
    <div>
      <label htmlFor="month-goal" className="text-sm text-span">
        {label}:
      </label>
      <form
        className="mt-2 flex w-full gap-2"
        onSubmit={handleSubmit(handleSetGoal)}
      >
        <input
          type="number"
          placeholder={placeholder}
          className="w-full max-w-52 rounded-md bg-background px-3 placeholder:text-placeholder"
          {...register('goal', {
            valueAsNumber: true,
          })}
        />
        <button
          type="submit"
          className="flex h-9 flex-1 items-center justify-center rounded-md bg-purple text-sm font-medium"
        >
          {isSubmitting ? (
            <ImSpinner2 className="animate-spin text-white" />
          ) : (
            <p>set</p>
          )}
        </button>
      </form>
    </div>
  );
};
