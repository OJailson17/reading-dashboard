import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getSession } from '@/app/actions/getSession';
import LoadingScreen from '@/app/loading';
import { BookCreationPreview } from '@/components/BookCreationPreview';
import { Footer } from '@/components/Footer';
import { MultiStepFormWrapper } from '@/components/Forms/MultiStepForm/MultiStepFormWrapper';
import { Header } from '@/components/Header';
import { applicationLinks } from '@/utils/constants/links';

export const metadata: Metadata = {
  title: 'Create Book | Reading Dashboard',
};

export default async function CreateBook() {
  const session = await getSession();

  if (!session) {
    return redirect(applicationLinks.login);
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Header />

      <main className="mt-20 flex w-full max-w-7xl items-center justify-center gap-8 max-sm:mx-auto max-sm:max-w-md max-sm:flex-col sm:items-start">
        <BookCreationPreview />

        <MultiStepFormWrapper user_database_id={session.database_id} />
      </main>

      <Footer />
    </Suspense>
  );
}
