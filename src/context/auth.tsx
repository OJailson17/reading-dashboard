'use client';

import { api } from '@/lib/axios';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type AuthProviderProps = {
	children: ReactNode;
};

type AuthContext = {
	onSignIn: (username: string) => Promise<void | boolean>;
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
	const onSignIn = async (username: string): Promise<void | boolean> => {
		try {
			const { data } = await api.post<LoginResponse>('/auth/login', {
				username,
			});

			// Set token cookies
			setCookie(undefined, '@reading_dashboard:token', data.token, {
				maxAge: 60 * 60 * 24, // 24 hours
			});

			// Set database id cookie
			setCookie(undefined, '@reading_dashboard:database_id', data.database_id, {
				maxAge: 60 * 60 * 24, // 24 hours
			});

			// Redirect user to home page
			router.push(`/`);
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
