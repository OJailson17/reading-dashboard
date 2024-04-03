'use client';

import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import * as yup from 'yup';

import { onSignIn } from '@/app/actions/signIn';
import { useGoal } from '@/context/GoalContext';
import { storageStrings } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from '../ui/use-toast';

interface Response {
	token: string;
	username: string;
	name: string;
	database_id: string;
	monthly_goal: number | null;
	yearly_goal: number | null;
	user_id: string;
}

interface ResponseError {
	error: string;
}

const loginSchemaValidation = yup.object({
	username: yup.string().trim().required('field required!'),
});

type InputFormDataProps = yup.InferType<typeof loginSchemaValidation>;

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<InputFormDataProps>({
		resolver: yupResolver(loginSchemaValidation),
	});

	const { onSetInitialGoals } = useGoal();

	const handleLogin = async ({ username }: InputFormDataProps) => {
		const signInResponse = (await onSignIn(
			username.trim().toLocaleLowerCase(),
		)) as Response | ResponseError;

		if ('error' in signInResponse) {
			return toast({
				description: signInResponse.error,
				variant: 'destructive',
			});
		}

		onSetInitialGoals({
			month: String(signInResponse.monthly_goal || '0'),
			year: String(signInResponse.yearly_goal || '0'),
		});

		localStorage.setItem(storageStrings.username, signInResponse.username);
		localStorage.setItem(storageStrings.user_id, signInResponse.user_id);
		localStorage.setItem(storageStrings.name, signInResponse.name);
	};

	return (
		<form
			onSubmit={handleSubmit(handleLogin)}
			autoComplete='off'
			className='mt-9 w-full flex items-center justify-center flex-col px-6 sm:px-20'
		>
			<div className='w-full'>
				<label htmlFor='username' className='text-span block'>
					use{' '}
					<span className='bg-gradient-primary inline-block text-transparent bg-clip-text font-bold'>
						demo_user
					</span>
				</label>
				<input
					type='text'
					placeholder='username'
					className='w-full h-12 mt-1 bg-background text-span placeholder:text-placeholder px-6 rounded-md'
					{...register('username')}
				/>
				<span className='text-red-400 text-sm mt-1'>
					{errors.username?.message}
				</span>
			</div>

			<button
				type='submit'
				className='w-36 h-10 font-semibold text-sm bg-purple mt-5 rounded-md text-white flex items-center justify-center'
			>
				{isSubmitting ? (
					<ImSpinner2 className='text-white animate-spin' />
				) : (
					<p>enter</p>
				)}
			</button>
		</form>
	);
};
