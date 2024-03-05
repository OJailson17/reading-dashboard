import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/global.css';
import { Toaster } from '@/components/ui/toaster';
import { BookContextProvider } from '@/context/BookContext';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--poppins',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Reading Dashboard',
	description: 'Reading Tracker',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${poppins.className}`}>
			<body className={`bg-background text-white`}>
				<div id='app' className='px-6 xl:px-24 flex flex-col max-w-max mx-auto'>
					<BookContextProvider>{children}</BookContextProvider>
				</div>
				<Toaster />
			</body>
		</html>
	);
}
