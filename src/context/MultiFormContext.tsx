'use client';

import { CreateBook } from '@/components/Form/BookForm';
import { useState, createContext, useContext, ReactNode } from 'react';

type MultiFormProviderProps = {
	children: ReactNode;
};

type FormDataProps = {
	values: Partial<CreateBook>;
};

type MultiFormContextProps = {
	data: Partial<CreateBook>;
	setFormValues: (values: FormDataProps) => void;
};

export const MultiFormContext = createContext({} as MultiFormContextProps);

export default function MultiFormProvider({
	children,
}: MultiFormProviderProps) {
	const [data, setData] = useState<Partial<CreateBook>>({});

	const setFormValues = (values: FormDataProps) => {
		// setData(prevValues => ({
		// 	...prevValues,
		// 	...values,
		// }));
		console.log({ values });
	};

	return (
		<MultiFormContext.Provider value={{ data, setFormValues }}>
			{children}
		</MultiFormContext.Provider>
	);
}

export const useMultiForm = () => useContext(MultiFormContext);
