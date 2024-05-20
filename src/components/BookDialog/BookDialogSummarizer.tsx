'use client';

import { useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';

import { createSummary } from '@/app/actions/createSummary';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { toast } from '../ui/use-toast';

interface BookDialogSummarizerProps {
  bookTitle: string;
  bookAuthor: string;
}

export const BookDialogSummarizer = ({
  bookAuthor,
  bookTitle,
}: BookDialogSummarizerProps) => {
  const [bookSummary, setBookSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handleDialogState = async (isDialogOPen: boolean) => {
    if (isDialogOPen) {
      await handleGenerateBookSummary();
    }
  };

  const handleGenerateBookSummary = async () => {
    try {
      setIsSummaryLoading(true);
      const summaryResponse = await createSummary({
        bookAuthor,
        bookTitle,
      });

      if (summaryResponse.length <= 0) {
        setBookSummary('Nothing Found!');
        setIsSummaryLoading(false);
        return;
      }

      setBookSummary(summaryResponse);
      setIsSummaryLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsSummaryLoading(false);
      toast({
        description: `Error: ${error?.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog onOpenChange={handleDialogState}>
      <DialogTrigger className="absolute left-6 top-4 h-6 w-6 rounded-sm bg-transparent">
        <BsStars size={24} className="text-light-green" />
      </DialogTrigger>

      <DialogContent className="flex min-h-80 w-[90%] max-w-[450px] flex-col items-center rounded-3xl border-none bg-background px-9 py-6 xs:px-6">
        <h1 className="mt-3 text-center text-xl font-medium">{bookTitle}</h1>

        {isSummaryLoading ? (
          <ImSpinner2 className="animate-spin" />
        ) : (
          <p className="mt-4 w-full break-words font-thin leading-relaxed text-span">
            {bookSummary}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
