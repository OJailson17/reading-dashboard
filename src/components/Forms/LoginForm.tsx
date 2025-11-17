'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import * as yup from 'yup';

import { useGoal } from '@/context/GoalContext';
import { storageStrings } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from '../ui/use-toast';
import { useState } from 'react';

interface Response {
  user: {
    token: string;
    username: string;
    name: string;
    database_id: string;
    monthly_goal: number | null;
    yearly_goal: number | null;
    user_id: string;
  };
}

const loginSchemaValidation = yup.object({
  username: yup.string().trim().required('field required!'),
});

type InputFormDataProps = yup.InferType<typeof loginSchemaValidation>;

export const LoginForm = () => {
  const [showUsername, setShowUsername] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputFormDataProps>({
    resolver: yupResolver(loginSchemaValidation),
  });

  const { onSetInitialGoals } = useGoal();
  const router = useRouter();

  const handleUsernameVisibility = () => {
    setShowUsername((currentState) => !currentState);
  };

  const handleLogin = async ({ username }: InputFormDataProps) => {
    const formattedUsername = username.trim().toLowerCase();

    try {
      const signInResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/?username=${formattedUsername}`,
        {
          next: {
            revalidate: false,
            tags: ['sign-in'],
          },
        },
      );

      if (!signInResponse.ok) {
        return toast({
          description: 'Error: Something went wrong',
          variant: 'destructive',
        });
      }

      const userResponse = (await signInResponse.json()) as Response;

      onSetInitialGoals({
        month: String(userResponse.user.monthly_goal || '0'),
        year: String(userResponse.user.yearly_goal || '0'),
      });

      localStorage.setItem(storageStrings.username, userResponse.user.username);
      localStorage.setItem(storageStrings.user_id, userResponse.user.user_id);
      localStorage.setItem(storageStrings.name, userResponse.user.name);

      router.prefetch('/');
      router.push('/');
    } catch (error) {
      console.log(error);
      return toast({
        description: 'Error: Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      autoComplete="off"
      className="mt-9 flex w-full flex-col items-center justify-center px-6 sm:px-20"
    >
      <div className="w-full">
        <label htmlFor="username-input" className="block text-span">
          coloque{' '}
          <span className="inline-block bg-gradient-primary bg-clip-text font-bold text-transparent">
            demo_user
          </span>{' '}
          para entrar
        </label>
        <div className="mt-1 flex h-12 w-full items-center justify-start gap-2 rounded-md bg-background pr-2 text-span">
          <input
            type={showUsername ? 'text' : 'password'}
            placeholder="username"
            className="h-full w-full rounded-md border-none bg-transparent px-2 outline-none placeholder:text-placeholder"
            {...register('username')}
            autoComplete="off"
            id="username-input"
          />
          <button
            type="button"
            onClick={handleUsernameVisibility}
            className="h-max"
          >
            {showUsername ? (
              <FaRegEyeSlash color="#7e808d" size={18} />
            ) : (
              <FaRegEye color="#7e808d" size={18} />
            )}
          </button>
        </div>
        <span className="mt-1 text-sm text-red-400">
          {errors.username?.message}
        </span>
      </div>

      <button
        type="submit"
        className="mt-5 flex h-10 w-36 items-center justify-center rounded-md bg-purple text-sm font-semibold text-white"
      >
        {isSubmitting ? (
          <ImSpinner2 className="animate-spin text-white" />
        ) : (
          <p>enter</p>
        )}
      </button>
    </form>
  );
};
