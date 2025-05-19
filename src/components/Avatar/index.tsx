'use client';

import { useEffect, useState } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';

export const MyAvatar = () => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    setConfig(
      genConfig({
        sex: 'man',
        earSize: 'small',
        hairColor: 'black',
        hairStyle: 'thick',
        bgColor: '#5CDAC3',
        hatStyle: 'none',
        shirtStyle: 'polo',
      }),
    );
  }, []);

  if (!config)
    return <div className="h-full w-full rounded-full bg-[#5CDAC3]" />;

  return <Avatar className="h-full w-full" {...config} />;
};
