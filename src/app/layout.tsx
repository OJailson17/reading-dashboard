import { Inter } from 'next/font/google';

import { AuthContextProvider } from '@/context/AuthContext';
import { BookContextProvider } from '@/context/BookContext';
import MultiFormProvider from '@/context/MultiFormContext';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/global';

const inter = Inter({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
});

export const metadata = {
	title: 'Home | Reading Dashboard',
};

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className={inter.className}>
			<body>
				<AuthContextProvider>
					<MultiFormProvider>
						<BookContextProvider>
							<GlobalStyles />
							<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
						</BookContextProvider>
					</MultiFormProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
}
