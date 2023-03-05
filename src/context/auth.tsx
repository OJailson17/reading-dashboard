'use client';

import { createContext, ReactNode, useContext } from 'react';

type AuthProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
	// fetch('api/login')
	// 	.then(res => res.json())
	// 	.then(data => console.log(data))
	// 	.catch(err => console.log(err));

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthentication = () => useContext(AuthContext);
