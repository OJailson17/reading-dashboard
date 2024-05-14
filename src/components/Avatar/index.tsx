'use client';

import Avatar, { genConfig } from 'react-nice-avatar';

const config = genConfig({
  sex: 'man',
  earSize: 'small',
  hairColor: 'black',
  hairStyle: 'thick',
  bgColor: '#5CDAC3',
  hatStyle: 'none',
  shirtStyle: 'polo',
});

export const MyAvatar = () => {
  return <Avatar className="h-full w-full" {...config} />;
};
