'use client';

import { onSignIn } from '@/app/actions/signIn';
import { storageStrings } from '@/utils/constants/storageStrings';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from '../ui/use-toast';

interface Response {
	token: string;
	username: string;
	database_id: string;
}

interface ResponseError {
	error: string;
}

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const handleLogin = async (data: any) => {
		const signInResponse = (await onSignIn(data.username)) as
			| Response
			| ResponseError;

		if ('error' in signInResponse) {
			return toast({
				description: signInResponse.error,
				variant: 'destructive',
			});
		}
		localStorage.setItem(storageStrings.username, signInResponse.username);
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
