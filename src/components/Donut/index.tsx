'use client';

import { DonutContainer, DonutMiddleContent, DonutSvg } from './styles';

interface DonutComponentProps {
	read_percentage: number;
}

export const DonutComponent = ({ read_percentage }: DonutComponentProps) => {
	return (
		<DonutContainer>
			<DonutSvg viewBox='0 0 232 232' read_percentage={read_percentage}>
				<circle
					cx={'50%'}
					cy={'50%'}
					r={'98.5'}
					stroke={'#D9D9D9'}
					opacity={'0.1'}
				/>
				<circle
					cx={'50%'}
					cy={'50%'}
					r={'98.5'}
					stroke={'url(#paint0_linear_201_85)'}
				/>
				<defs>
					<linearGradient
						id='paint0_linear_201_85'
						x1='-9'
						y1='82'
						x2='145'
						y2='178'
						gradientUnits='userSpaceOnUse'
					>
						<stop stopColor='#CE9FFC' />
						<stop offset='1' stopColor='#7367F0' />
					</linearGradient>
				</defs>
			</DonutSvg>
			<DonutMiddleContent>
				<h3>{read_percentage}%</h3>
				<span>Alcançada</span>
			</DonutMiddleContent>
		</DonutContainer>
	);
};
