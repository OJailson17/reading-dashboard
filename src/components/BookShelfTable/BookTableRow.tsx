import Image from 'next/image';
import { IoStar } from 'react-icons/io5';
import { DialogTrigger } from '../ui/dialog';

export const BookTableRow = () => {
	const handleRowClick = (event: any) => {
		// Handle row click event here
		// openDialog();
		alert('Row clicked');
	};

	const handleKeyPress = (event: any) => {
		if (event.key === 'Enter' || event.key === ' ') {
			// Handle key press event here
			// openDialog();
			alert('Row key pressed');
		}
	};

	return (
		<tr
		// tabIndex={0}
		// onKeyDown={handleKeyPress}
		// onClick={handleRowClick}
		>
			{/* Details */}
			<td>
				<DialogTrigger className='flex items-center gap-4'>
					<div className='min-w-16 h-24 rounded-md relative'>
						<Image
							src={
								'https://reading-dashboard-git-v2-ojailson17.vercel.app/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fpanmac%2Ftr%3Af-auto%2Cdi-placeholder_portrait_aMjPtD9YZ.jpg%2Cw-270%2Fedition%2F9781529053869.jpg&w=1920&q=75'
							}
							alt={`cover`}
							fill
							priority
							className='object-cover rounded-md'
						/>
					</div>

					<div className='flex flex-col gap-3'>
						<div className='max-w-60 ellipsis-title'>
							<p className='font-bold break-words'>Fluent Forever</p>
							<span className='font-bold text-span text-xs'>Gabriel Wyner</span>
						</div>

						<div className='flex items-center gap-1'>
							<IoStar fill='yellow' />
							<IoStar fill='yellow' />
							<IoStar fill='yellow' />
							<IoStar fill='yellow' />
							<IoStar fill='gray' />
						</div>
					</div>
				</DialogTrigger>
			</td>

			{/* Status */}
			<td className='max-sm:hidden'>
				<div className='font-light max-h-6 text-white border-[1.5px] border-light-green w-[90%] mx-auto max-w-40 px-2 rounded-md text-center text-sm py-3 flex items-center justify-center'>
					Finished
				</div>
			</td>

			{/* Genres */}
			<td className='space-y-2 max-sm:hidden'>
				<div className='font-light max-h-6 text-white border-[1.5px] border-purple w-[90%] mx-auto max-w-40 px-2 rounded-md text-center text-sm py-3 flex items-center justify-center'>
					Non-fiction
				</div>
				<div className='font-light max-h-6 text-white border-[1.5px] border-purple w-[90%] mx-auto max-w-40 px-2 rounded-md text-center text-sm py-3 flex items-center justify-center'>
					Self-help
				</div>
			</td>

			{/* Started */}
			<td className='max-sm:hidden'>
				<div className='text-center'>
					<p className='font-bold text-xs'>Jan 8</p>
					<span className='font-bold text-span text-xs'>2024</span>
				</div>
			</td>

			{/* Finished */}
			<td className='max-sm:hidden'>
				<div className='text-center'>
					<p className='font-bold text-xs'>Jan 30</p>
					<span className='font-bold text-span text-xs'>2024</span>
				</div>
			</td>
		</tr>
	);
};
