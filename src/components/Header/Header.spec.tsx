import { describe, it, afterEach, expect, vi } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { Header } from './index';

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the component', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Reading Dashboard')).toBeInTheDocument();
    expect(getByText('@demo')).toBeInTheDocument();
  });
});
