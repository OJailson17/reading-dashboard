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

type SearchProps = {
	isOpen: boolean;
};

export const SearchBarContainer = styled.form<SearchProps>`
	position: relative;
	width: 100%;
	max-width: 300px;
	min-height: 30px;

	& div:last-child {
		display: ${props => (props.isOpen ? 'block' : 'none')};

		width: 100%;
		height: 1px;
		background: #fff;

		position: absolute;
		bottom: 0;

		animation: ${fadeIn} 0.3s ease;
	}

	&:focus-within div:nth-child(2) {
		background-color: #1677ff;
	}
`;

export const SearchInput = styled.input<SearchProps>`
	background: transparent;
	color: white;
	padding: 8px 0 8px 8px;
	width: 100%;
	border: none;
	border-radius: 5px;
	outline: none;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 1;
	animation: ${fadeIn} 0.3s ease;
	display: ${props => (props.isOpen ? 'block' : 'none')};

	&::placeholder {
		color: #c4c4c4;
	}
`;
