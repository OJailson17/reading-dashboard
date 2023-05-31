'use client';

import styled from 'styled-components';

export const SelectComponent = styled.select`
	width: 100%;
	height: 50px;
	margin: 2rem 0;
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 4px;
	padding: 0 15px;
	font-size: 1rem;
	line-height: 1;
	height: 35px;
	gap: 10px;
	background-color: transparent;
	border: none;
	color: #c4c4c4;

	&:hover {
		background-color: #4a4556;
		cursor: pointer;
	}

	option {
		width: 100%;
		height: 50px;
		font-size: 13px;
		line-height: 1;
		color: #fff;
		border-radius: 3px;
		display: flex;
		align-items: center;
		/* padding: 30px 35px 30px 25px; */
		position: relative;
		user-select: none;
		background: #292738;
		cursor: pointer;
	}
`;
