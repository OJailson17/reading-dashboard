'use client';

import { revalidateData } from '@/app/actions/revalidateData';
import { usePathname, useRouter } from 'next/navigation';
import { startTransition } from 'react';
import { IoMdRefresh } from 'react-icons/io';

export const RevalidateButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRevalidateData = async () => {
    localStorage.removeItem('@reading_dashboard:bookshelf_completion_stats');
    await revalidateData();

    startTransition(() => {
      router.replace(pathname || '/bookshelf');
    });
  };

  return (
    <button onClick={handleRevalidateData} title="Update">
      <IoMdRefresh size={20} />
    </button>
  );
};
