'use client';

import { CreateBook } from '@/components/Form/BookForm';
import { useState, createContext, useContext, ReactNode } from 'react';

type MultiFormProviderProps = {
	children: ReactNode;
};

type FormDataProps = Partial<CreateBook>;

type MultiFormContextProps = {
	// data: Partial<CreateBook>;
	// setFormValues: (values: FormDataProps) => void;
	// onCreateBook: () => void;

	onHandleNext: () => void;
	onHandleBack: () => void;
	formData: Partial<CreateBook>;
	step: number;
	onResetSteps: () => void;
	onSetFormData: (data: FormDataProps) => { book: FormDataProps };
};

export const MultiFormContext = createContext({} as MultiFormContextProps);

export default function MultiFormProvider({
	children,
}: MultiFormProviderProps) {
	// const [data, setData] = useState<Partial<CreateBook>>({});

	// const setFormValues = (values: FormDataProps) => {
	// 	setData(prevValues => ({
	// 		...prevValues,
	// 		values,
	// 	}));

	// 	console.log(values);
	// };

	// const onCreateBook = () => {
	// 	console.log({ data });
	// };

	// return (
	// 	<MultiFormContext.Provider value={{ data, setFormValues, onCreateBook }}>
	// 		{children}
	// 	</MultiFormContext.Provider>
	// );

	const [formData, setFormData] = useState<FormDataProps>({});
	const [step, setStep] = useState(1);

	function onHandleNext() {
		setStep(prev => prev + 1);
	}

	function onHandleBack() {
		setStep(prev => prev - 1);
	}

	const onResetSteps = () => {
		setStep(1);
	};

	function onSetFormData(data: FormDataProps) {
		setFormData((prev: any) => ({ ...prev, ...data }));

		console.log({ data });

		return {
			book: data,
		};
	}

	return (
		<MultiFormContext.Provider
			value={{
				formData,
				onSetFormData,
				onHandleBack,
				onHandleNext,
				step,
				onResetSteps,
			}}
		>
			{children}
		</MultiFormContext.Provider>
	);
}

export const useMultiForm = () => useContext(MultiFormContext);
