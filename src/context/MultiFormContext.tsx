'use client';

import { useState, createContext, useContext, ReactNode } from 'react';

import { Book } from '@/@types/book';

type MultiFormProviderProps = {
	children: ReactNode;
};

type FormDataProps = Partial<Book>;

type MultiFormContextProps = {
	onHandleNext: () => void;
	onHandleBack: () => void;
	formData: Partial<Book>;
	step: number;
	onSetFormData: (data: FormDataProps) => { book: FormDataProps };
	onResetForm: () => void;
};

export const MultiFormContext = createContext({} as MultiFormContextProps);

export default function MultiFormProvider({
	children,
}: MultiFormProviderProps) {
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

	const onResetForm = () => {
		setFormData({});
		onResetSteps();
	};

	function onSetFormData(data: FormDataProps) {
		setFormData((prev: Partial<Book>) => ({ ...prev, ...data }));

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
				onResetForm,
			}}
		>
			{children}
		</MultiFormContext.Provider>
	);
}

export const useMultiForm = () => useContext(MultiFormContext);
