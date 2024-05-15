import { describe, it, afterEach, expect } from 'vitest';

import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { testBookList } from '../../../test/__testData__/books';
import { FinishedCard } from './index';

describe('Finished Card Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the component', () => {
    const { getByText } = render(<FinishedCard books={testBookList} />);

    expect(getByText('Just Finished')).toBeInTheDocument();
    expect(getByText(testBookList[0].title)).toBeInTheDocument();
  });

  it.skip('should be able to show a message when there is no books on the list', () => {
    const { getByText } = render(<FinishedCard books={[]} />);

    expect(getByText('Just Finished')).toBeInTheDocument();
    expect(getByText('There is nothing here')).toBeInTheDocument();
  });

  it('should be able to open a dialog after click on some book', async () => {
    const { getAllByRole, getByText } = render(
      <FinishedCard books={testBookList} />,
    );

    const books = getAllByRole('button');
    await userEvent.click(books[0]);

    expect(books[0].ariaExpanded).toEqual('true');
    expect(books[1].ariaExpanded).toEqual('false');
    expect(getByText(testBookList[0].author)).toBeInTheDocument();
    expect(getByText(testBookList[0].status.toUpperCase())).toBeInTheDocument();
  });
});
