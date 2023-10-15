'use client';

import { useState } from 'react';

import { SearchBarContainer, SearchIcon, SearchInput } from './styles';

export const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSearch = () => {
		setIsOpen(!isOpen);
	};

	return (
		<SearchBarContainer>
			<SearchIcon onClick={toggleSearch}>🔍</SearchIcon>
			<SearchInput isOpen={isOpen} placeholder='Search...' />
		</SearchBarContainer>
	);
};
