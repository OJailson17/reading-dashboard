import { it, describe, expect, afterEach } from 'vitest';

import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ReadingCard } from '.';
import { testBookList } from '../../../test/__testData__/books';

describe('Reading Card Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the component', () => {
    const { getByText } = render(<ReadingCard books={testBookList} />);

    expect(getByText('Currently Reading')).toBeInTheDocument();
    expect(getByText(testBookList[1].title)).toBeInTheDocument();
    expect(getByText(testBookList[1].author)).toBeInTheDocument();
  });

  it.skip('should be able to show a message when there is no books on the list', () => {
    const { getByText } = render(<ReadingCard books={[]} />);

    expect(getByText('Want to Read')).toBeInTheDocument();
    expect(getByText('There is nothing here')).toBeInTheDocument();
  });

  it('should be able to open a dialog after click on some book', async () => {
    const { getAllByRole, getByText } = render(
      <ReadingCard books={testBookList} />,
    );

    const books = getAllByRole('button');
    await userEvent.click(books[0]);

    expect(books[0].ariaExpanded).toEqual('true');
    expect(getByText(`${testBookList[1].total_pages} p`)).toBeInTheDocument();
  });

  // it('should be able to update book pages', async () => {
  //   const { getAllByRole, getByText, getByPlaceholderText, getByRole } = render(
  //     <ReadingCard books={testBookList} />,
  //   );

  //   const books = getAllByRole('button');
  //   await userEvent.click(books[0]);

  //   // const pageInput = getByPlaceholderText(testBookList[1].current_page);
  //   // await userEvent.type(pageInput, '50');

  //   // const submitButton = getByText('save');
  //   // await userEvent.click(submitButton);
  // });
});
