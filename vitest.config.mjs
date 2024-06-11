import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});