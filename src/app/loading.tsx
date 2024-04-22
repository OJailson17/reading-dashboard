import { ImSpinner2 } from 'react-icons/im';

export default function LoadingScreen() {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<ImSpinner2 className='animate-spin' />
		</div>
	);
}
