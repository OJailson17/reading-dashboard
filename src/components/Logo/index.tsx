import { aclonica } from '@/utils/fonts';
import { cva } from 'class-variance-authority';
import Link from 'next/link';

interface LogoProps {
	variant?: 'default' | 'footer';
}

const logoVariants = cva(
	`bg-gradient-primary inline-block text-transparent bg-clip-text ${aclonica.className}`,
	{
		variants: {
			variant: {
				default: 'text-2xl xl:text-4xl',
				footer: 'text-2xl xl:text-3xl opacity-30 pointer-events-none',
			},
		},
	},
);

export const Logo = ({ variant = 'default' }: LogoProps) => {
	return (
		<Link href={'/'} className={logoVariants({ variant })}>
			Reading Dashboard
		</Link>
	);
};
