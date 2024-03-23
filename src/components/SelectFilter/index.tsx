'use client';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

export const SelectFilter = () => {
	return (
		<div className='w-full flex flex-col gap-1 justify-center sm:hidden'>
			<Select onValueChange={e => console.log(e)}>
				<SelectTrigger className='w-full max-sm:h-11'>
					<SelectValue placeholder='All Books' />
				</SelectTrigger>

				<SelectContent className='bg-background'>
					<SelectGroup className='bg-background text-span'>
						<SelectItem value='All Books' className='max-sm:h-11'>
							All Books
						</SelectItem>
						<SelectItem value='Reading' className='max-sm:h-11'>
							Reading
						</SelectItem>
						<SelectItem value='Finished' className='max-sm:h-11'>
							Finished
						</SelectItem>
						<SelectItem value='To Review' className='max-sm:h-11'>
							To Review
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
