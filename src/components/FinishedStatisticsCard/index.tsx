/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGoal } from '@/context/GoalContext';
import { calculatePercentage, storageStrings } from '@/utils';

import { CircularProgressBar } from '../CircularProgressBar';

interface Book {
  current: number;
}

interface FinishedStatisticCardProps {
  card?: 'month' | 'year';
  books: Book;
}

interface Stats {
  amountOfPagesRead: number;
  averagesPages: number;
  averageDaysToFinish: number;
  finishedBooks: number;
}

export const FinishedStatisticCard = ({
  card = 'month',
  books,
}: FinishedStatisticCardProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [bookStats, setBookStats] = useState({
    goal: '0',
    current: books.current,
  });
  const [goalPercentage, setGoalPercentage] = useState(0);

  const { bookGoals } = useGoal();

  useEffect(() => {
    if (card === 'month') {
      setBookStats({ ...bookStats, goal: bookGoals.month });
    } else {
      // if it's year card and it has search query, get the goals from local storage
      const getStorageStats = localStorage.getItem(storageStrings.stats);

      if (query && getStorageStats) {
        const convertStats = JSON.parse(getStorageStats) as Stats;

        return setBookStats({
          goal: bookGoals.year,
          current: convertStats.finishedBooks,
        });
      }

      setBookStats({ goal: bookGoals.year, current: books.current });
    }
  }, [bookGoals, books, card]);

  useEffect(() => {
    if (Number(bookStats.goal) <= 0) {
      return setGoalPercentage(0);
    }

    const finishedPercentage = calculatePercentage({
      total: Number(bookStats.goal),
      value: bookStats.current,
    });

    setGoalPercentage(finishedPercentage);
  }, [bookStats]);

  return (
    <div className="flex h-48 max-w-[403px] items-center justify-center gap-6 rounded-2xl bg-secondary-background px-8 lg:px-3 xl:px-8">
      <CircularProgressBar bar_percentage={goalPercentage} />

      <div className="flex-1 text-span lg:text-sm xl:text-base">
        <p>
          <span className="font-bold">{bookStats.current}</span>/
          {bookStats.goal}
        </p>

        {card === 'month' && <p>books read this month</p>}
        {card === 'year' && (
          <p>
            books completed to <span className="font-bold">year</span> challenge
          </p>
        )}
      </div>
    </div>
  );
};
