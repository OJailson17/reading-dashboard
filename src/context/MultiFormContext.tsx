'use client';

import { useState, createContext, useContext, ReactNode } from 'react';

import { CreateBook } from '@/@types/bookTypes';

type MultiFormProviderProps = {
	children: ReactNode;
};

type FormDataProps = Partial<CreateBook>;

type MultiFormContextProps = {
	onHandleNext: () => void;
	onHandleBack: () => void;
	formData: Partial<CreateBook>;
	step: number;
	onResetSteps: () => void;
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
		onSetFormData({
			author: '',
			book_review: '',
			current_page: 0,
			finished_date: undefined,
			genres: [],
			goodreads_review: '',
			icon_url: '',
			language: 'Portuguese',
			name: '',
			qtd_page: 0,
			status: 'To read',
			started_date: undefined,
		});
	};

	function onSetFormData(data: FormDataProps) {
		setFormData((prev: any) => ({ ...prev, ...data }));

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
				onResetForm,
			}}
		>
			{children}
		</MultiFormContext.Provider>
	);
}

export const useMultiForm = () => useContext(MultiFormContext);
