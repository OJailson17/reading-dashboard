'use client';

import * as Select from '@radix-ui/react-select';
import { GoTriangleDown } from 'react-icons/go';
import { DonutComponent } from '../Donut';
import {
	ChartDataWrapper,
	SelectContent,
	SelectItem,
	SelectTriggerButton,
	SelectViewport,
	StatusComponent,
} from './styles';

interface StatusProps {
	books_name: string;
	total_pages: number;
	current_page: number;
}

export const Status = () => {
	return (
		<StatusComponent>
			<p className='status-component-title'>Reading</p>

			<Select.Root defaultValue='book1'>
				<SelectTriggerButton>
					<Select.Value placeholder='Select a book' />
					<Select.Icon style={{ color: 'white' }}>
						<GoTriangleDown />
					</Select.Icon>
				</SelectTriggerButton>

				<Select.Portal>
					<SelectContent>
						{/* <Select.Item value='book1' style={{ background: 'red' }}>
							Nome do livro 1
						</Select.Item>
						<Select.Item value='book2' style={{ background: 'red' }}>
							Nome do livro 2
						</Select.Item> */}

						<SelectViewport>
							<SelectItem value='book1'>
								<Select.ItemText>
									Book 1 que possui umnome meio longo demais para um libri
								</Select.ItemText>
								{/* <Select.ItemIndicator /> */}
							</SelectItem>
							<SelectItem value='book2'>
								<Select.ItemText>Book 2</Select.ItemText>
								{/* <Select.ItemIndicator /> */}
							</SelectItem>
							<SelectItem value='book3'>
								<Select.ItemText>Book 2</Select.ItemText>
								{/* <Select.ItemIndicator /> */}
							</SelectItem>
							<SelectItem value='book4'>
								<Select.ItemText>Book 2</Select.ItemText>
								{/* <Select.ItemIndicator /> */}
							</SelectItem>
						</SelectViewport>
					</SelectContent>
				</Select.Portal>
			</Select.Root>

			{/* <span className='status-component-book-name'>
				Book Name quando o nome do book é muito grande
			</span> */}

			<DonutComponent />

			<ChartDataWrapper>
				<div className='chart-data'>
					<div className='circle-data'></div>
					<p className='chart-label'>Total Pages</p>
					<span className='chart-data-value'>300</span>
				</div>
				<div className='chart-data'>
					<div className='circle'></div>
					<p className='chart-label'>Current Page</p>
					<span className='chart-data-value'>210</span>
				</div>
			</ChartDataWrapper>
		</StatusComponent>
	);
};
