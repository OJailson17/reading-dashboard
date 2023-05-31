'use client';

import { SelectComponent } from './styles';
import { useEffect, useState } from 'react';
import Select from 'react-select';

interface SelectBookProps {
	books: string[];
	onSelectBook: (book: string) => void;
}

export const SelectBook = ({ books, onSelectBook }: SelectBookProps) => {
	const [showSelect, setShowSelect] = useState(false);

	const options = books.map(book => {
		return {
			value: book,
			label: book,
		};
	});

	useEffect(() => {
		setShowSelect(true);
	}, []);

	return (
		<SelectComponent>
			{showSelect && (
				<Select
					className='basic-single'
					classNamePrefix='select'
					defaultValue={{
						label: books[0],
						value: books[0],
					}}
					name='color'
					options={options}
					onChange={option => onSelectBook(option?.value || '')}
					styles={{
						control: baseStyles => ({
							...baseStyles,
							background: '#292738',
							border: 'none',
							cursor: 'pointer',
						}),
						container: base => ({
							...base,
							width: '100%',
						}),
						menu: base => ({
							...base,
							background: '#292738',
							color: 'white',
							borderRadius: '3px',
						}),
						option: (base, state) => ({
							...base,
							background: state.isFocused ? '#4a4556' : '#292738',
							cursor: 'pointer',
							fontWeight: 'normal',
							textAlign: 'left',
						}),
						singleValue: base => ({
							...base,
							color: '#c4c4c4',
							fontWeight: 'normal',
							textAlign: 'left',
						}),

						indicatorSeparator: base => ({
							...base,
							display: 'none',
						}),
					}}
				/>
			)}
		</SelectComponent>
	);
};
