import { Button } from '../ui/button';
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer';

export const ReadingBookStats = () => {
	return (
		<>
			<DrawerTrigger className='w-full text-left bg-transparent'>
				<div className='w-full flex justify-between'>
					<div>
						<p className='font-light text-span'>A Culpa é das Estrelas</p>
						<span className='font-light text-placeholder text-sm'>
							John Green
						</span>
					</div>

					<span className='font-light text-span'>50%</span>
				</div>

				<div className='mt-2 relative bg-background w-full h-2 rounded-full'>
					<div className={`w-1/2 h-2 bg-gradient-primary rounded-full`} />
				</div>
			</DrawerTrigger>
		</>
	);
};
