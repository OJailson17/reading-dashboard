'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

import { Tab } from '@/app/bookshelf/page';
import { applicationLinks } from '@/utils/constants/links';

interface Amounts {
  amountOfAllBooks: number;
  amountOfToReadBooks: number;
  amountOfReadingBooks: number;
  amountOfFinishedBooks: number;
  amountOfToReviewBooks: number;
}

interface BookshelfNavProps {
  booksAmount: Amounts;
  currentTab: Tab;
  query: string;
}

const textStateStyle = {
  active: 'bg-gradient-primary text-transparent bg-clip-text',
  inactive: 'text-white',
};

export const BookshelfNav = ({
  booksAmount,
  currentTab,
  query,
}: BookshelfNavProps) => {
  const router = useRouter();

  const handleChangeTab = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedTab = e.currentTarget.getAttribute('data-tab');

    if (clickedTab && clickedTab !== currentTab) {
      if (query) {
        return router.push(
          `${applicationLinks.bookshelf}/?tab=${clickedTab}&q=${query}`,
          {
            scroll: false,
          },
        );
      }

      return router.push(`${applicationLinks.bookshelf}/?tab=${clickedTab}`, {
        scroll: false,
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between text-sm	 font-bold text-white max-sm:hidden sm:max-lg:flex-row lg:text-lg">
      <button
        className="rounded-sm max-sm:w-40"
        data-tab="all"
        onClick={handleChangeTab}
      >
        <p
          className={
            currentTab === 'all'
              ? textStateStyle.active
              : textStateStyle.inactive
          }
        >
          All Books ({booksAmount.amountOfAllBooks})
        </p>
      </button>
      <button
        data-tab="tbr"
        onClick={handleChangeTab}
        className=" rounded-sm max-sm:w-40"
      >
        <p
          className={
            currentTab === 'tbr'
              ? textStateStyle.active
              : textStateStyle.inactive
          }
        >
          To Read ({booksAmount.amountOfToReadBooks})
        </p>
      </button>
      <button
        data-tab="reading"
        onClick={handleChangeTab}
        className=" rounded-sm max-sm:w-40"
      >
        <p
          className={
            currentTab === 'reading'
              ? textStateStyle.active
              : textStateStyle.inactive
          }
        >
          Reading ({booksAmount.amountOfReadingBooks})
        </p>
      </button>
      <button
        data-tab="finished"
        onClick={handleChangeTab}
        className=" rounded-sm max-sm:w-40"
      >
        <p
          className={
            currentTab === 'finished'
              ? textStateStyle.active
              : textStateStyle.inactive
          }
        >
          Finished ({booksAmount.amountOfFinishedBooks})
        </p>
      </button>
      <button
        data-tab="review"
        onClick={handleChangeTab}
        className=" rounded-sm max-sm:w-40"
      >
        <p
          className={
            currentTab === 'review'
              ? textStateStyle.active
              : textStateStyle.inactive
          }
        >
          To Review ({booksAmount.amountOfToReviewBooks})
        </p>
      </button>
    </div>
  );
};
