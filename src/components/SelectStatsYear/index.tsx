'use client';

import { useRouter } from 'next/navigation';

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

	return years;
};

export const SelectStatsYear = ({ currentTabYear }: SelectStatsYearProps) => {
	const router = useRouter();

	const handleChangeStatsYear = (selectedYear: string) => {
		if (selectedYear !== currentTabYear) {
			router.push(`/stats/?year=${selectedYear}`, {
				scroll: false,
			});
		}
	};

	const selectOptions = getSelectYearsOptions();

	return (
		<div className='w-full flex flex-col gap-1 mt-7'>
			<span className='text-span'>year:</span>
			<Select onValueChange={handleChangeStatsYear}>
				<SelectTrigger className='w-full max-sm:h-11'>
					<SelectValue placeholder={currentTabYear} />
				</SelectTrigger>

				<SelectContent className='bg-background'>
					<SelectGroup className='bg-background text-span'>
						{selectOptions.map(option => (
							<SelectItem
								value={String(option)}
								key={option}
								className='max-sm:h-11'
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
