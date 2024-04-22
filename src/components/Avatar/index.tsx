import Avatar, { genConfig } from 'react-nice-avatar';

export const MyAvatar = () => {
	const config = genConfig({
		sex: 'man',
		earSize: 'small',
		hairColor: 'black',
		hairStyle: 'thick',
		bgColor: '#5CDAC3',
		hatStyle: 'none',
		shirtStyle: 'polo',
		isGradient: true,
	});

	return <Avatar className='w-full h-full' {...config} />;
};
