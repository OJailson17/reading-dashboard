'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SearchBarContainer = styled.div`
	position: relative;
	width: 200px;
	background: red;
`;

export const SearchIcon = styled.div`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	cursor: pointer;
	z-index: 2;
`;

type SearchInputProps = {
	isOpen: boolean;
};

export const SearchInput = styled.input<SearchInputProps>`
	background: transparent;
	color: white;
	padding: 8px 0 8px 8px;
	width: 100%;
	border: 1px solid #ccc;
	border-top: none;
	border-left: none;
	border-right: none;
	border-radius: 5px;
	outline: none;
	position: absolute;
	top: 50%;
	/* right: 10px; */
	transform: translateY(-50%);
	z-index: 1;
	animation: ${fadeIn} 0.3s ease;
	display: ${props => (props.isOpen ? 'block' : 'none')};
`;
