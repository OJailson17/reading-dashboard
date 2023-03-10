import { Inter } from '@next/font/google';

import { GlobalStyles } from '@/styles/global';
import { AuthContextProvider } from '@/context/AuthContext';

import StyledComponentsRegistry from '@/lib/registry';

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
					<GlobalStyles />
					<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
				</AuthContextProvider>
			</body>
		</html>
	);
}
