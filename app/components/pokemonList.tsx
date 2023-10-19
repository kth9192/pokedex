'use client';

import PokemonCard from '@/components/pokemonCard';
import usePokemonDefault from '@/lib/client/usePokemonDefault';
import usePokemons from '@/lib/client/usePokemons';
import { usePokemonListStore } from '@/shared/store/globalStore';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

function PokemonList() {
  const {
    data: pokemonDefaultInfo,
    isLoading: pokemonDefaultLoading,
    error: pokemonDefaultErr,
  } = usePokemonDefault();
  const pageNum = usePokemonListStore((state) => state.pageNum);
  const { pokemonList, isLoading, error } = usePokemons({ pageNum });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[824px] font-bold mx-auto">
        <span>is loading....</span>
      </div>
    );

  return (
    <div>
      <div className="grid w-full grid-cols-4 xl:grid-cols-5 gap-2">
        {pokemonList?.map((pokemonInfo) => (
          <PokemonCard key={pokemonInfo.id} {...pokemonInfo} />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
