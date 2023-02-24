import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/global';
import { defaultTheme } from '@/styles/theme/defaultTheme';
import { ThemeProvider } from 'styled-components';
import { Inter } from '@next/font/google';

const inter = Inter({
	subsets: ['latin'],
	weight: ['500', '600'],
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
				<GlobalStyles />
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</body>
		</html>
	);
}
