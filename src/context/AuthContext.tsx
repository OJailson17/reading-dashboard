'use client';

import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { createContext, ReactNode, useContext } from 'react';
import { toast } from 'react-toastify';

import { api } from '@/lib/axios';
import { cookiesStrings } from '@/utils/constants/storageStrings';

type AuthProviderProps = {
	children: ReactNode;
};

type AuthContext = {
	onSignIn: (username: string) => Promise<boolean>;
};

type LoginResponse = {
	token: string;
	username: string;
	database_id: string;
};

const AuthContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();

	// Make request to login route to return the jwt token
	const onSignIn = async (username: string): Promise<boolean> => {
		try {
			const response = await api.get<LoginResponse>(
				`/auth?username=${username}`,
			);

			// Set token cookies
			setCookie({ res: response }, cookiesStrings.TOKEN, response.data.token, {
				maxAge: 60 * 60 * 24 * 7, // 7 days
				path: '/',
			});

			// Set database id cookie
			setCookie(
				{ res: response },
				cookiesStrings.DATABASE_ID,
				response.data.database_id,
				{
					maxAge: 60 * 60 * 24 * 7, // 7 days
					path: '/',
				},
			);

			// Redirect user to home page
			router.push(`/`);

			return true;
		} catch (error) {
			toast('User not found', {
				position: 'top-center',
				autoClose: 5000,
				theme: 'dark',
				type: 'error',
			});
			console.log(error);
			return false;
		}
	};

	return (
		<AuthContext.Provider value={{ onSignIn }}>{children}</AuthContext.Provider>
	);
};

export const useAuthentication = () => useContext(AuthContext);
