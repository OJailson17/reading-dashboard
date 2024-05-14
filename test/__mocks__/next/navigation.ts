import { vi } from 'vitest';

const useRouter = vi.fn();

useRouter.mockImplementation(() => ({
  push: vi.fn(),
  // Add other properties you need from useRouter if necessary
}));

export { useRouter };
