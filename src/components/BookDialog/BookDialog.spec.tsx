import { afterEach, describe, expect, it } from 'vitest';

import { handleFormatDate, handleRemoveZeroDigit } from '@/utils';
import { cleanup, render } from '@testing-library/react';

import { BookDialog } from '.';
import { testBookList } from '../../../test/__testData__/books';
import { Dialog } from '../ui/dialog';

describe('Book Dialog', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the component with to read status', () => {
    const { getAllByText, getByText, queryByText } = render(
      <Dialog open={true}>
        <BookDialog type="To read" book={testBookList[0]} />
      </Dialog>,
    );

    expect(getAllByText(testBookList[0].title)[0]).toBeInTheDocument();
    expect(getAllByText(testBookList[0].author)[0]).toBeInTheDocument();
    expect(
      getAllByText(testBookList[0].status.toUpperCase())[0],
    ).toBeInTheDocument();
    expect(getByText('Goodreads:')).toBeInTheDocument();
    expect(queryByText('Review:')).not.toBeInTheDocument();
    expect(testBookList[0].status).toBe('To read');
  });

  it('should be able to see dates and review when status is finished', () => {
    const { getByText } = render(
      <Dialog open={true}>
        <BookDialog type="Finished" book={testBookList[2]} />
      </Dialog>,
    );

    expect(getByText(testBookList[2].status.toUpperCase())).toBeInTheDocument();
    expect(getByText('Review:')).toBeInTheDocument();
    expect(
      getByText(
        handleFormatDate(
          new Date(handleRemoveZeroDigit(testBookList[2].started_date || '')),
        ),
      ),
    ).toBeInTheDocument();
    expect(
      getByText(
        handleFormatDate(
          new Date(handleRemoveZeroDigit(testBookList[2].finished_date || '')),
        ),
      ),
    ).toBeInTheDocument();
  });

  it('should not be able to see dates and review if status is not finished', () => {
    const { queryByText } = render(
      <Dialog open={true}>
        <BookDialog type="Reading" book={testBookList[1]} />
      </Dialog>,
    );

    expect(
      queryByText(testBookList[1].status.toUpperCase()),
    ).toBeInTheDocument();
    expect(queryByText('Review:')).not.toBeInTheDocument();
    expect(
      queryByText(
        handleFormatDate(
          new Date(handleRemoveZeroDigit(testBookList[2].started_date || '')),
        ),
      ),
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        handleFormatDate(
          new Date(handleRemoveZeroDigit(testBookList[2].finished_date || '')),
        ),
      ),
    ).not.toBeInTheDocument();
  });
});
