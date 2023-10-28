'use client';

import PokemonInfoModal from '@/components/pokemonInfoModal';
import PokemonList from '@/components/pokemonList';
import {
  usePokemonListStore,
  usePokemonModalStore,
} from '@/shared/store/globalStore';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

function PokemonListArea() {
  const pageSize = 10;
  const pageNum = usePokemonListStore((state) => state.pageNum);
  const setPageNum = usePokemonListStore((state) => state.setPageNum);
  const [pageArr, setPageArr] = useState<number[]>([]);

  // const isOpen = usePokemonModalStore((state) => state.isOpen);
  // const convertModalState = usePokemonModalStore(
  //   (state) => state.convertModalState,
  // );

  const [minNum, setMinNum] = useState(1);
  const [maxNum, setMaxNum] = useState(10);

  // const handleModalOpen = () => {
  //   convertModalState();
  // };

  const handlePreviousPage = () => {
    pageNum > 1 && setPageNum(pageNum - 1);
  };

  const handleNextPage = () => {
    setPageNum(pageNum + 1);
  };

  const handleChangePage = (pagenum: number) => {
    setPageNum(pagenum);
  };

  useEffect(() => {
    if (minNum > pageNum || maxNum < pageNum) {
      const currentBlock = Math.ceil(pageNum / pageSize);

      setMinNum((currentBlock - 1) * pageSize + 1);
      setMaxNum((currentBlock - 1) * pageSize + pageSize);
    }
  }, [pageNum]);

  useEffect(() => {
    setPageArr(Array.from({ length: 10 }).map((_, idx) => minNum + idx));
  }, [minNum, maxNum]);

  return (
    <div className="flex justify-center w-full">
      {/* <SearchBar borderClass="mb-4" /> */}
      <div className="w-full md:w-[80%] lg:w-1/2">
        <PokemonList />

        <nav className="flex justify-center gap-2 mt-4">
          <button onClick={handlePreviousPage}>
            <ChevronLeftIcon className="w-4 aspect-square" />
          </button>
          <ol className="flex items-center gap-1">
            {pageArr.map((item) => (
              <li
                key={item}
                className={classNames(
                  'w-6 rounded aspect-square cursor-pointer',
                  {
                    'font-bold': item === pageNum,
                  },
                )}
                onClick={() => handleChangePage(item)}
              >
                {item}
              </li>
            ))}
          </ol>

          <button onClick={handleNextPage}>
            <ChevronRightIcon className="w-4 aspect-square" />
          </button>
        </nav>
      </div>

      {/* <PokemonInfoModal isOpen={isOpen} closeModal={handleModalOpen} /> */}
    </div>
  );
}

export default PokemonListArea;
