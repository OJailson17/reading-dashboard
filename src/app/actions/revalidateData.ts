'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const revalidateData = async () => {
  revalidateTag('fetch-books');
  revalidateTag('fetch-book-stats');
  revalidateTag('sign-in');
};
