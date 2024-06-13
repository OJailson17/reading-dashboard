import { describe, it, afterEach, expect } from 'vitest';

import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { testBookList } from '../../../test/__testData__/books';
import { TBRCard } from './index';

describe('TBR Card Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the component', () => {
    const { getByText } = render(<TBRCard books={testBookList} />);

    expect(getByText('Want to Read')).toBeInTheDocument();
    expect(getByText(testBookList[0].title)).toBeInTheDocument();
    expect(getByText(testBookList[0].author)).toBeInTheDocument();
  });

  it('should be able to show a message when there is no books on the list', () => {
    const { getByText } = render(<TBRCard books={[]} />);

    expect(getByText('Want to Read')).toBeInTheDocument();
    expect(getByText('No Books')).toBeInTheDocument();
  });

  it('should be able to open a dialog after click on some book', async () => {
    const { getAllByRole, getByText } = render(
      <TBRCard books={testBookList} />,
    );

    const books = getAllByRole('button');
    await userEvent.click(books[0]);

    expect(books[0].ariaExpanded).toEqual('true');
    expect(getByText(testBookList[0].total_pages)).toBeInTheDocument();
    expect(getByText(testBookList[0].status.toUpperCase())).toBeInTheDocument();
  });
});
