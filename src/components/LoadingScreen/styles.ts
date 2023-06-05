import styled from 'styled-components';

type LoadingProps = {
	full_screen_height?: boolean;
};

export const LoadingComponent = styled.div<LoadingProps>`
	width: 100%;
	height: ${({ full_screen_height = true }) =>
		full_screen_height ? '100vh' : '100%'};

	display: flex;
	align-items: center;
	justify-content: center;
`;
