import Image from 'next/image';
import { DrawerContent, DrawerHeader } from '../ui/drawer';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { BookDialog } from '../BookDialog';

export const UpdateReadingDialog = () => {
	return (
		<DrawerContent className='bg-secondary-background border-none'>
			<DrawerHeader className='w-full h-ful relative'>
				<div className='w-28 absolute h-40 -top-20 left-1/2 -translate-x-1/2 rounded-2xl'>
					<Image
						src={
							'https://m.media-amazon.com/images/I/51M9IbBqxCL._AC_UF1000,1000_QL80_.jpg'
						}
						alt='book cover'
						fill
						className='object-contain rounded-2xl'
					/>
				</div>
				<div className='mt-20 flex items-center justify-center gap-4'>
					<span className='font-light text-span'>300 p</span>
					<Dialog>
						<DialogTrigger className='text-blue font-light cursor-pointer'>
							details
						</DialogTrigger>
						<BookDialog />
					</Dialog>
				</div>
			</DrawerHeader>

			<form
				className='mt-4 mb-6 flex flex-col gap-6 items-center justify-center'
				autoComplete='off'
			>
				<div className='flex flex-col gap-1 justify-center text-span'>
					<label htmlFor='current-page'>current page:</label>
					<input
						type='text'
						placeholder='200'
						className='bg-background w-60 h-9 rounded-md px-4'
					/>
				</div>
				<div className='flex flex-col gap-1 justify-center text-span'>
					<label htmlFor='current-page'>status:</label>
					<Select defaultValue='reading'>
						<SelectTrigger className='w-60'>
							<SelectValue placeholder='Select status' />
						</SelectTrigger>

						<SelectContent className='bg-background'>
							<SelectGroup className='bg-background text-span'>
								{/* <SelectLabel>Status</SelectLabel> */}
								<SelectItem value='to read'>To read</SelectItem>
								<SelectItem value='reading'>Reading</SelectItem>
								<SelectItem value='finished'>Finished</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<button className='w-60 h-9 bg-purple rounded-md font-medium text-sm'>
					Save
				</button>
			</form>
		</DrawerContent>
	);
};
