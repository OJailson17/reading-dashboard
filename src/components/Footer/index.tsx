import Link from 'next/link';

import { applicationLinks } from '@/utils/constants/links';

import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-4 py-14 md:flex-row">
      <Logo variant="footer" />
      <p>
        developed by 💜
        <Link
          href={applicationLinks.home}
          className="font-medium text-purple hover:underline"
        >
          Jailson de Oliveira
        </Link>
      </p>
    </footer>
  );
};
