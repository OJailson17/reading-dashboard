'use client';

import { revalidateData } from '@/app/actions/revalidateData';
import { useTransition } from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { toast } from '@/components/ui/use-toast';

export const RevalidateButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleRevalidateData = () => {
    startTransition(async () => {
      localStorage.removeItem('@reading_dashboard:bookshelf_completion_stats');
      await revalidateData();

      toast({
        description: 'Books Updated',
        variant: 'success',
      });
    });
  };

  return (
    <button
      onClick={handleRevalidateData}
      title="Update"
      disabled={isPending}
      className={isPending ? 'animate-spin' : ''}
    >
      <IoMdRefresh size={20} />
    </button>
  );
};
