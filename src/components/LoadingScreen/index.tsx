'use client';

import React from 'react';
import { Rings } from 'react-loading-icons';
import { LoadingComponent } from './styles';

export const LoadingScreen = () => {
	return (
		<LoadingComponent>
			<Rings />
		</LoadingComponent>
	);
};
