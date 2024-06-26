'use client';

import { useRouter } from 'next/navigation';

import { applicationLinks } from '@/utils/constants/links';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface SelectStatsYearProps {
  currentTabYear: string;
}

const getSelectYearsOptions = () => {
  const currentYear = new Date().getUTCFullYear();
  const startYear = 2022;
  const years: number[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  const yearsInDescendingOrder = years.sort((a, b) => b - a);

  return yearsInDescendingOrder;
};

export const SelectStatsYear = ({ currentTabYear }: SelectStatsYearProps) => {
  const router = useRouter();

  const handleChangeStatsYear = (selectedYear: string) => {
    if (selectedYear !== currentTabYear) {
      router.push(`${applicationLinks.stats}/?year=${selectedYear}`, {
        scroll: false,
      });
    }
  };

  const selectOptions = getSelectYearsOptions();

  return (
    <div className="mt-7 flex w-full flex-col gap-1">
      <span className="text-span">year:</span>
      <Select onValueChange={handleChangeStatsYear}>
        <SelectTrigger className="w-full max-sm:h-11">
          <SelectValue placeholder={currentTabYear} />
        </SelectTrigger>

        <SelectContent className="bg-background">
          <SelectGroup className="bg-background text-span">
            {selectOptions.map((option) => (
              <SelectItem
                value={String(option)}
                key={option}
                className="max-sm:h-11"
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
