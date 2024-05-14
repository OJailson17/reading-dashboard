'use client';

import { useMultiForm } from '@/context/MultiFormContext';

import { BookAuthorForm } from './BookAuthorForm';
import { BookCoverForm } from './BookCoverForm';
import { BookDatesForm } from './BookDatesForm';
import { BookGenresForm } from './BookGenresForm';
import { BookPagesForm } from './BookPagesForm';
import { BookPriceForm } from './BookPriceForm';
import { BookReviewForm } from './BookReviewForm';
import { BookStatusLanguageForm } from './BookStatusLanguageForm';
import { BookTitleForm } from './BookTitleForm';

interface MultiStepFormProps {
  user_database_id: string;
}

export const MultiStepForm = ({ user_database_id }: MultiStepFormProps) => {
  const { step } = useMultiForm();

  const ActiveStepFormComponent = () => {
    switch (step) {
      case 1:
        return <BookTitleForm />;
      case 2:
        return <BookAuthorForm />;
      case 3:
        return <BookCoverForm />;
      case 4:
        return <BookStatusLanguageForm />;
      case 5:
        return <BookPagesForm />;
      case 6:
        return <BookGenresForm />;
      case 7:
        return <BookReviewForm user_database_id={user_database_id} />;
      case 8:
        return <BookPriceForm />;
      case 9:
        return <BookDatesForm user_database_id={user_database_id} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-14 w-full">
      <ActiveStepFormComponent />
    </div>
  );
};
