import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/global';

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body>
				<GlobalStyles />
				<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
			</body>
		</html>
	);
}
