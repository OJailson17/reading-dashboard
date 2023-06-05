'use client';

import React from 'react';
import { Rings } from 'react-loading-icons';

import { LoadingComponent } from './styles';

interface LoadingProps {
	full_screen_height?: boolean;
}

export const LoadingScreen = ({ full_screen_height }: LoadingProps) => {
	return (
		<LoadingComponent full_screen_height={full_screen_height}>
			<Rings />
		</LoadingComponent>
	);
};
