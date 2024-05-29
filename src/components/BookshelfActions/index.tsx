'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import { ImSpinner2 } from 'react-icons/im';

import { Book } from '@/@types/book';
import { generateRecommendations } from '@/app/actions/generateRecommendations';
import { useMultiForm } from '@/context/MultiFormContext';
import { handleFormatCoverURL, storageStrings } from '@/utils';
import { applicationLinks } from '@/utils/constants/links';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

interface BookshelfActionsProps {
  books: Book[];
}

interface Recommendation {
  title: string;
  author: string;
  genres: string[];
  pages: number;
  isbn: string;
}

export const BookshelfActions = ({ books }: BookshelfActionsProps) => {
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );
  const [showRecommendationButton, setShowRecommendationButton] =
    useState(false);

  const { onSetFormData } = useMultiForm();
  const router = useRouter();

  const handleDialogState = async (isDialogOPen: boolean) => {
    if (isDialogOPen) {
      await handleGetRecommendation();
    }
  };

  const handleGetRecommendation = async () => {
    setIsRecommendationLoading(true);
    const formatBooks = books.map((book) => {
      return {
        title: book.title,
        author: book.author,
        genres: book.genres.map((genre) => genre.name),
      };
    });

    try {
      const response = await generateRecommendations({ books: formatBooks });

      if (response.length <= 0) {
        setIsRecommendationLoading(false);
        setRecommendation(null);
        return;
      }

      const formatResponse = JSON.parse(response) as Recommendation;

      setRecommendation(formatResponse);
      setIsRecommendationLoading(false);
    } catch (error) {
      console.log(error);
      setIsRecommendationLoading(false);
    }
  };

  // Set the recommendation book to form default data and redirect the user to create book page
  const handleAddBook = () => {
    onSetFormData({
      title: recommendation?.title,
      author: recommendation?.author,
      status: 'To read',
      total_pages: recommendation?.pages,
      cover_url: handleFormatCoverURL(recommendation?.isbn || ''),
    });

    router.push(applicationLinks.createBook);
  };

  useEffect(() => {
    const username = localStorage.getItem(storageStrings.username);

    if (username !== 'demo_user') {
      setShowRecommendationButton(true);
    }
  }, []);

  return (
    <div className="w-full rounded-2xl bg-secondary-background p-6 sm:max-lg:w-72 lg:w-80">
      <h3 className="mb-9 text-xl font-bold sm:max-lg:hidden">Bookshelf</h3>
      <div className="flex flex-col items-center justify-center gap-4 sm:max-lg:flex-row">
        {showRecommendationButton && (
          <Dialog onOpenChange={handleDialogState}>
            <DialogTrigger className="flex w-full items-center justify-center gap-3 rounded-lg border-[1px]  border-light-green bg-transparent px-3 py-3 sm:max-lg:px-2 sm:max-lg:py-2">
              Recommend
              <BsStars size={20} />
            </DialogTrigger>

            <DialogContent className="flex min-h-60  w-[90%] max-w-[450px] flex-col items-center rounded-3xl border-none bg-background px-9 py-6 xs:px-6">
              <h1 className="mt-3 text-center text-xl font-medium">
                Recommendation
              </h1>

              {isRecommendationLoading && (
                <ImSpinner2 className="animate-spin" />
              )}

              {!isRecommendationLoading && recommendation && (
                <div className="mt-4 w-full">
                  <p className="break-words font-thin leading-relaxed text-span">
                    Based on your taste, I recommend you read{' '}
                    <span className="font-bold text-light-green">
                      {recommendation?.title}
                    </span>{' '}
                    by{' '}
                    <span className="font-medium">
                      {recommendation?.author}
                    </span>
                    . It is a{' '}
                    <span className="font-medium">
                      {recommendation?.genres[0]}
                    </span>{' '}
                    book and has{' '}
                    <span className="font-medium">{recommendation?.pages}</span>{' '}
                    pages
                  </p>
                </div>
              )}

              {recommendation && (
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={handleGetRecommendation}
                    className="hover:text-light-green"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleAddBook}
                    className="rounded-md bg-purple p-2"
                  >
                    Add Book
                  </button>
                </div>
              )}

              {!isRecommendationLoading && !recommendation && (
                <p className="break-words font-thin leading-relaxed text-span">
                  I couldn&lsquo;t find any book recommendation
                </p>
              )}
            </DialogContent>
          </Dialog>
        )}

        <Link
          href={applicationLinks.createBook}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-purple px-3 py-3 text-lg font-medium sm:max-lg:mt-0 sm:max-lg:px-2 sm:max-lg:py-2"
        >
          <FaPlus />
          Add
        </Link>
      </div>
    </div>
  );
};
