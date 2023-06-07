import StyledComponentsRegistry from '@/lib/registry';

import { Inter } from 'next/font/google';

import { AuthContextProvider } from '@/context/AuthContext';
import { BookContextProvider } from '@/context/BookContext';

import { GlobalStyles } from '@/styles/global';

const inter = Inter({
	subsets: ['latin'],
	weight: ['500', '600', '700'],
});

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
					<BookContextProvider>
						<GlobalStyles />
						<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
					</BookContextProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
}
