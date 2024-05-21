'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import { ImSpinner2 } from 'react-icons/im';

import { Book } from '@/@types/book';
import { generateRecommendations } from '@/app/actions/generateRecommendations';
import { storageStrings } from '@/utils';
import { decrypt } from '@/utils/auth/decrypt';
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
}

export const BookshelfActions = ({ books }: BookshelfActionsProps) => {
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );
  const [showRecommendationButton, setShowRecommendationButton] =
    useState(false);

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

            <DialogContent className="flex  w-[90%] max-w-[450px] flex-col items-center rounded-3xl border-none bg-background px-9 py-6 xs:px-6">
              <h1 className="mt-3 text-center text-xl font-medium">
                Recommendation
              </h1>

              {isRecommendationLoading && (
                <ImSpinner2 className="animate-spin" />
              )}

              {!isRecommendationLoading && recommendation && (
                <div className="mt-4 w-full">
                  <p className="break-words font-thin leading-relaxed text-span">
                    Based on you taste, I recommend you to read{' '}
                    <strong>{recommendation?.title}</strong> by{' '}
                    {recommendation?.author}. It is a{' '}
                    {recommendation?.genres[0]} book and it has{' '}
                    {recommendation?.pages} pages
                  </p>
                </div>
              )}

              {recommendation && (
                <button onClick={handleGetRecommendation}>Try again</button>
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
