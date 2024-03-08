interface CircularProgressBarProps {
	bar_percentage: number;
}

export const CircularProgressBar = ({
	bar_percentage = 0,
}: CircularProgressBarProps) => {
	const pi = Math.PI;
	const radius = 45;
	const circumference = Math.round(2 * pi * radius);
	const percentage = bar_percentage > 100 ? 100 : bar_percentage;

	const strokeDashOffset = circumference - (circumference * percentage) / 100;

	// todo add a gradient
	return (
		<div className='relative w-20 h-20'>
			<svg className='w-full h-full' viewBox='0 0 100 100'>
				<defs>
					<linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
						<stop
							offset='0%'
							style={{ stopColor: '#ff0000', stopOpacity: 1 }}
						/>
						<stop
							offset='100%'
							style={{ stopColor: '#0000ff', stopOpacity: 1 }}
						/>
					</linearGradient>
				</defs>
				<circle
					className='text-background stroke-current'
					strokeWidth='7'
					cx='50'
					cy='50'
					r={radius}
					fill='transparent'
				></circle>
				<circle
					className='text-indigo-500 stroke-current progress-ring__circle'
					strokeWidth='7'
					strokeLinecap='round'
					cx='50'
					cy='50'
					r={radius}
					fill='none'
					stroke={`url(#gradient`}
					strokeDasharray='280'
					strokeDashoffset={strokeDashOffset}
				></circle>
				<text
					x='50'
					y='50'
					textAnchor='middle'
					dominantBaseline='middle'
					fill='white'
				>
					{bar_percentage}%
				</text>
			</svg>
		</div>
	);
};
