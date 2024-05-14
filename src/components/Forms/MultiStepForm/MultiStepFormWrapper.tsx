'use client';

import Link from 'next/link';

import { useMultiForm } from '@/context/MultiFormContext';
import { applicationLinks } from '@/utils/constants/links';

import { MultiStepForm } from '.';

interface MultiStepFormWrapperProps {
  user_database_id: string;
}

export const MultiStepFormWrapper = ({
  user_database_id,
}: MultiStepFormWrapperProps) => {
  const { step } = useMultiForm();

  const totalNumberOfSteps = 9;

  return (
    <div className="min-h-80 w-full max-w-3xl flex-1 rounded-2xl bg-secondary-background px-8 py-6 sm:px-9">
      <header className="flex w-full items-center justify-between">
        <Link href={applicationLinks.home} className="font-medium underline">
          Cancel
        </Link>
        <h3 className="bg-gradient-secondary bg-clip-text text-2xl font-bold text-transparent">
          Create Book
        </h3>
        <p className="font-bold text-span">
          <span>{step}</span>/<span>{totalNumberOfSteps}</span>
        </p>
      </header>

      <MultiStepForm user_database_id={user_database_id} />
    </div>
  );
};
