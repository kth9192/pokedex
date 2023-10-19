import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface SearchBarProps {
  borderClass: string;
}

function SearchBar({ borderClass }: SearchBarProps) {
  return (
    <div className={classNames(borderClass)}>
      <form>
        <div className="flex items-center relative">
          <input
            type="text"
            className="block p-2 w-full rounded-lg"
            placeholder="포켓몬 검색"
          />
          <MagnifyingGlassIcon className="w-6 absolute right-2" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
