import { describe, it, afterEach, expect, vi } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { Footer } from './index';

describe('Footer Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to render the component', () => {
    const { getByText } = render(<Footer />);

    expect(getByText('Reading Dashboard')).toBeInTheDocument();
    expect(getByText('Jailson de Oliveira')).toBeInTheDocument();
  });
});
