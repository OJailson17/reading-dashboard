import Link from 'next/link';
import { FooterComponent } from './styles';

export const Footer = () => {
	return (
		<FooterComponent>
			Developed by{' '}
			<Link href={'https://jailsondeoliveira.vercel.app'} target={'_blank'}>
				Jailson de Oliveira
			</Link>
		</FooterComponent>
	);
};
