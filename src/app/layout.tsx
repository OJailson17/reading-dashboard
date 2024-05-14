import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/global.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { CustomProvider } from 'rsuite';

import { Toaster } from '@/components/ui/toaster';
import { GoalContextProvider } from '@/context/GoalContext';
import MultiFormProvider from '@/context/MultiFormContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Home | Reading Dashboard',
  description: 'Reading Tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body className={`h-screen overflow-x-hidden bg-background text-white`}>
        <div id="app" className="mx-auto flex w-screen flex-col px-6 xl:px-24">
          <CustomProvider theme="dark">
            <MultiFormProvider>
              <GoalContextProvider>{children}</GoalContextProvider>
            </MultiFormProvider>
          </CustomProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
