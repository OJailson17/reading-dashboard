'use server';

import { revalidateTag } from 'next/cache';

import { Book, BookStatus } from '@/@types/book';
import { notion } from '@/lib/notion';
import { handleFormatDate } from '@/utils';
import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from '@notionhq/client';

type UpdateStatusProps = {
  book_id: string;
  current_page: number;
  started_date?: string;
};

type UpdateBookStatus = {
  status: BookStatus;
  book: Partial<Book>;
};

const today = handleFormatDate(new Date(), 'utc');

export const updateBookStatus = async ({ book, status }: UpdateBookStatus) => {
  if (status === 'Finished') {
    let startedDate = book.started_date;

    if (!startedDate) {
      startedDate = today;
    }

    return await setStatusToFinished({
      book_id: book.id || '',
      current_page: book.current_page || 0,
      started_date: startedDate,
    });
  }

  if (status === 'Reading') {
    return await setStatusToReading({
      book_id: book.id || '',
      current_page: book.current_page || 0,
    });
  }

  return await setStatusToTBR({
    book_id: book.id || '',
  });
};

const setStatusToFinished = async ({
  book_id,
  current_page,
  started_date,
}: UpdateStatusProps) => {
  try {
    await notion.pages.update({
      page_id: book_id,
      properties: {
        Status: {
          select: {
            name: 'Finished',
          },
        },
        'Current Page': {
          number: Number(current_page),
        },
        'Finished Date': {
          date: {
            start: today,
          },
        },
        'Started Date': {
          date: {
            start: started_date || today,
          },
        },
      },
    });

    revalidateTag('fetch-books');
    revalidateTag('fetch-book-stats');

    return {};
  } catch (error) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          return {
            error: 'Request Timeout',
          };

        case APIErrorCode.ObjectNotFound:
          return {
            error: 'Object not found',
          };

        case APIErrorCode.Unauthorized:
          return {
            error: 'Unauthorized',
          };

        default:
          console.log(error);
          return {
            error: error.message,
            status: error.status,
          };
      }
    }
  }
};

const setStatusToReading = async ({
  book_id,
  current_page,
}: UpdateStatusProps) => {
  try {
    await notion.pages.update({
      page_id: book_id,
      properties: {
        Status: {
          select: {
            name: 'Reading',
          },
        },
        'Current Page': {
          number: Number(current_page),
        },
        'Started Date': {
          date: {
            start: today,
          },
        },
        'Finished Date': {
          date: null,
        },
      },
    });

    revalidateTag('fetch-books');
    revalidateTag('fetch-book-stats');

    return {};
  } catch (error) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          return {
            error: 'Request Timeout',
          };

        case APIErrorCode.ObjectNotFound:
          return {
            error: 'Object not found',
          };

        case APIErrorCode.Unauthorized:
          return {
            error: 'Unauthorized',
          };

        default:
          console.log(error);
          return {
            error: error.message,
            status: 400,
          };
      }
    }
  }
};

const setStatusToTBR = async ({
  book_id,
}: Omit<UpdateStatusProps, 'current_page'>) => {
  try {
    await notion.pages.update({
      page_id: book_id,
      properties: {
        Status: {
          select: {
            name: 'To read',
          },
        },
        'Current Page': {
          number: 0,
        },
        'Started Date': {
          date: null,
        },
        'Finished Date': {
          date: null,
        },
      },
    });

    revalidateTag('fetch-books');
    revalidateTag('fetch-book-stats');

    return {};
  } catch (error) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          return {
            error: 'Request Timeout',
          };

        case APIErrorCode.ObjectNotFound:
          return {
            error: 'Object not found',
          };

        case APIErrorCode.Unauthorized:
          return {
            error: 'Unauthorized',
          };

        default:
          console.log(error);
          return {
            error: error.message,
            status: 400,
          };
      }
    }
  }
};
