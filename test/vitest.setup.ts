/// <reference types="vitest" />

import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

window.scrollTo = () => {};

vi.mock('next/font/google', () => ({
  Aclonica: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
}));
