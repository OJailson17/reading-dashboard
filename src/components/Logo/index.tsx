import { cva } from 'class-variance-authority';
import Link from 'next/link';

import { applicationLinks } from '@/utils/constants/links';
import { aclonica } from '@/utils/helpers/fonts';

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
		<Link href={applicationLinks.home} className={logoVariants({ variant })}>
			Reading Dashboard
		</Link>
	);
};
