'use client';

import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';

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
			const { data } = await api.post<LoginResponse>('/auth/login', {
				username,
			});

			// Set token cookies
			setCookie(undefined, '@reading_dashboard:token', data.token, {
				maxAge: 60 * 60 * 24 * 7, // 7 days
				path: '/',
			});

			// Set database id cookie
			setCookie(undefined, '@reading_dashboard:database_id', data.database_id, {
				maxAge: 60 * 60 * 24 * 7, // 7 days
				path: '/',
			});

			console.log(data.database_id);

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
