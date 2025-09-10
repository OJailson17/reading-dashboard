'use client';

import { useEffect, useState } from 'react';

import { onSignOut } from '@/app/actions/signOut';
import { storageStrings } from '@/utils';

import { MyAvatar } from '../Avatar';
import { Logo } from '../Logo';

export const Header = () => {
  const [userFullName, setUserFullName] = useState('Demo User');

  const handleSignOut = async () => {
    localStorage.clear();

    await onSignOut();
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const fullName = localStorage.getItem(storageStrings.name);

      if (fullName) {
        setUserFullName(fullName);
      }
    }
  }, []);

  return (
    <header className="flex w-full max-w-7xl items-center justify-between pt-14">
      <Logo />

      <button
        onClick={handleSignOut}
        className="flex max-w-max items-center justify-center gap-4 rounded-sm text-left sm:w-full sm:max-w-56"
      >
        <div className="h-10 w-10 rounded-full bg-transparent sm:h-14 sm:w-14">
          <MyAvatar />
        </div>
        <div className="hidden flex-1 overflow-hidden md:block ">
          <p className="font-semibold ">{userFullName}</p>
        </div>
      </button>
    </header>
  );
};
