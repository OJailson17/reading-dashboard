import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { TBRDialog } from './TBRDialog';

export const TBRBookStats = () => {
	return (
		<>
			<DialogTrigger className='w-full text-left bg-transparent'>
				<div className='w-full flex justify-between'>
					<div>
						<p className='font-light text-span'>O Sol é Para Todos</p>
						<span className='font-light text-placeholder text-sm'>
							Harper Lee
						</span>
					</div>
				</div>
			</DialogTrigger>
		</>
	);
};
