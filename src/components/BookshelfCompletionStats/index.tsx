/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { CircularProgressBar } from '../CircularProgressBar';
import { formatBooks } from '@/utils/formatting/formatBook';

interface CompletionStats {
  total_books: number;
  finished_books: number;
}

interface BookshelfCompletionStatsProps {
  database_id: string;
}

const fetchBooks = async (database_id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book?db=${database_id}&period=any_time`,
    );

    if (!response.ok) {
      console.log({ response });
      return [];
    }

    const bookResponse = await response.json();

    const formattedBooks = formatBooks(bookResponse);

    return formattedBooks;
  } catch (err) {
    console.log(err);
  }
};

export const BookshelfCompletionStats = ({
  database_id,
}: BookshelfCompletionStatsProps) => {
  const [bookStats, setBookStats] = useState({
    total_books: 0,
    finished_books: 0,
  });
  const [booksPercentage, setBooksPercentage] = useState(0);

  const handleGetAllBooks = async () => {
    let stats: CompletionStats = { finished_books: 0, total_books: 0 };
    const completionStatsFromStorage = localStorage.getItem(
      '@reading_dashboard:bookshelf_completion_stats',
    );

    if (completionStatsFromStorage) {
      stats = JSON.parse(completionStatsFromStorage) as CompletionStats;
    } else {
      const books = (await fetchBooks(database_id)) || [];
      const finishedBooks = books.filter((book) => book.status === 'Finished');
      stats = {
        total_books: books.length,
        finished_books: finishedBooks.length,
      };

      if (books.length > 0) {
        localStorage.setItem(
          '@reading_dashboard:bookshelf_completion_stats',
          JSON.stringify(stats),
        );
      }
    }

    const percentage = Number(
      ((stats.finished_books / stats.total_books) * 100).toFixed(0),
    );

    setBookStats(stats);
    setBooksPercentage(percentage);
  };

  useEffect(() => {
    handleGetAllBooks();
  }, []);

  return (
    <div className="flex h-48 max-w-[403px] items-center justify-center gap-6 rounded-2xl bg-secondary-background px-8 lg:px-3 xl:px-8">
      <CircularProgressBar bar_percentage={booksPercentage} />

      <div className="flex-1 text-span lg:text-sm xl:text-base">
        <p>
          <span className="font-bold">{bookStats.finished_books}</span>/
          {bookStats.total_books}
        </p>

        <p>Books completed from the bookshelf</p>
      </div>
    </div>
  );
};
