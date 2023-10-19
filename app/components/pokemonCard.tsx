import { PokemonResponse } from '@/interface/pokemon';
import { usePokemonModalStore } from '@/shared/store/globalStore';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PokemonCardProps extends PokemonResponse {}

function PokemonCard({
  id,
  name,
  height,
  weight,
  abilities,
  species,
  sprites,
}: PokemonCardProps) {
  const setPokemon = usePokemonModalStore((state) => state.setPokemon);

  const handleCurrentPokemon = (id: number) => {
    setPokemon(id);
  };

  return (
    <Link href={`/${id}`} onClick={() => handleCurrentPokemon(id)}>
      <div
        className="flex flex-col items-center p-2 w-full bg-white rounded-md border border-gray-200 aspect-square	cursor-pointer"
        onClick={() => handleCurrentPokemon(id)}
      >
        <div className="flex gap-1 font-bold">
          <span>NO.{id}</span>
          <span>{name}</span>
        </div>

        <div className="flex w-full aspect-square relative my-auto">
          <Image src={sprites.front_default} alt={'pokemon_thumbnail'} fill />
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
