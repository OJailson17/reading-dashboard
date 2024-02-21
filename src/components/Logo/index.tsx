import { aclonica } from '@/app/layout';
import Link from 'next/link';

export const Logo = () => {
	return (
		<Link
			href={'/'}
			className={`bg-gradient-primary inline-block text-transparent bg-clip-text text-4xl ${aclonica.className}`}
		>
			Reading Dashboard
		</Link>
	);
};
