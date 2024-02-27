import { ReadingBookStats } from './ReadingBookStats';
import { Drawer } from '../ui/drawer';
import { UpdateReadingDialog } from './UpdateReadingDialog';

export const ReadingCard = () => {
	return (
		<div className='w-full max-w-[403px] min-h-[384px] px-7 py-6 bg-secondary-background rounded-2xl'>
			<header className='flex items-end justify-between'>
				<h2 className='font-bold text-xl'>currently reading</h2>
				{/* <Link href={'/'} className='text-span text-sm hover:underline'>
					see all
				</Link> */}
			</header>

			<div className='h-60 mt-9 py-1 pl-1 pr-3 space-y-6 overflow-y-auto books-container'>
				{[...new Array(6)].map((el, i) => (
					<Drawer key={`${el}-${i}`}>
						<ReadingBookStats />
						<UpdateReadingDialog />
					</Drawer>
				))}
			</div>
		</div>
	);
};
