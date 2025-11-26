'use server';

import { revalidateTag } from 'next/cache';

export const revalidateData = async () => {
  revalidateTag('fetch-books');
  revalidateTag('fetch-book-stats');
  revalidateTag('sign-in');
};
