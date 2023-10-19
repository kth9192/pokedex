import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/pika-48.png';

function Header() {
  return (
    <header className="flex w-full h-12 items-center shadow-lg bg-white dark:text-white dark:bg-stone-950	border-none px-8 border">
      <Link href={'/'}>
        <div className="flex items-center gap-2">
          {/* <BookOpenIcon className="w-6 h-6" /> */}
          <div className="w-6 h-6 relative flex">
            <Image src={logo} alt={'logo'} fill />
          </div>

          <span className="font-bold">Pokedex</span>
        </div>
      </Link>
    </header>
  );
}

export default Header;
