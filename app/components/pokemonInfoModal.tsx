'use client';

import { usePokemonModalStore } from '@/shared/store/globalStore';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/solid';
import usePokemonSpecies from '@/lib/client/usePokemonSpecies';
import Image from 'next/image';
import usePokemon from '@/lib/client/usePokemon';
import useSWR from 'swr';
import axios from 'axios';
import { PokemonSpeciesResponse } from '@/interface/pokemon';
import { typeList } from '@/shared/resource';
import useEvolutionChain from '@/lib/client/useEvolutionChain';
import { makeDepthFirstList } from '@/shared/algorithm';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';

Modal.setAppElement('#modal-root');

interface PokemonInfoModalProps {
  isOpen: boolean;
  closeModal: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

function PokemonInfoModal({ isOpen, closeModal }: PokemonInfoModalProps) {
  const id = usePokemonModalStore((state) => state.pokemonId);
  const { data: pokemonSpecies } = usePokemonSpecies({ id });
  const { data: pokemonInfo } = usePokemon({ id });

  const { data: evolutionChainRes } = useEvolutionChain({
    id: Number(
      pokemonSpecies?.evolution_chain.url
        .split('/')
        .filter((item) => item)
        .at(-1),
    ),
  });

  const {
    data: pokemonEvolutionTree,
    error: pokemonEvolutionTreeErr,
    isValidating,
  } = useSWR<PokemonSpeciesResponse[]>(
    evolutionChainRes
      ? makeDepthFirstList(evolutionChainRes).map((val) => val.url)
      : null,
    (urls: string[]) =>
      Promise.all(
        urls.map((url: string) => {
          return axios.get(encodeURI(url)).then((res) => {
            return res.data;
          });
        }),
      ),
  );

  return (
    <Modal
      isOpen={isOpen}
      className={'w-[900px] h-[600px]'}
      onRequestClose={closeModal}
    >
      <div className="flex  justify-between items-start">
        <XMarkIcon className="w-6 cursor-pointer ml-auto" />
      </div>

      <div className="flex w-[250px] mx-auto aspect-square relative">
        <Image
          src={pokemonInfo?.sprites.front_default ?? '/null.svg'}
          alt={'pokemon_thumbnail'}
          fill
        />
      </div>
      <div className="flex w-full justify-center mb-2">
        <h1 className="flex items-center font-bold text-xl gap-1 ">
          <span className="font-medium text-sm">No.{pokemonInfo?.id}</span>
          <span>
            {
              pokemonSpecies?.names.find((name) => name.language.name === 'ko')
                ?.name
            }
          </span>
        </h1>
      </div>

      <table className="w-2/3 mx-auto table-fixed overflow-hidden rounded-lg mb-4 ">
        <thead>
          <tr className="text-white">
            <th className="bg-red-500">분류</th>
            <th className="bg-red-500">키/몸무게</th>
            <th className="bg-red-500">타입</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center bg-[#f7f7f7]">
              {
                pokemonSpecies?.genera.find(
                  (genus) => genus.language.name === 'ko',
                )?.genus
              }
            </td>
            <td className="text-center bg-[#f7f7f7]">
              {pokemonInfo && `${pokemonInfo?.height / 10}m`}/
              {pokemonInfo && `${pokemonInfo?.weight / 10}kg`}
            </td>
            <td className="text-center bg-[#f7f7f7]">
              {pokemonInfo?.types
                .map(
                  (type) =>
                    typeList.find(
                      (typeItem) => typeItem.name === type.type.name,
                    )?.ko,
                )
                .join(', ')}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-col items-center">
        <h2 className="font-bold">진화단계</h2>
        <ol className="flex items-center gap-2">
          {pokemonEvolutionTree
            ?.map(
              (tree) =>
                tree.names.find((tree) => tree.language.name === 'ko')?.name,
            )
            .map((name, idx) => (
              <li key={name} className="flex items-center font-bold text-lg">
                <span>{name}</span>
                {idx <
                  pokemonEvolutionTree?.map(
                    (tree) =>
                      tree.names.find((tree) => tree.language.name === 'ko')
                        ?.name,
                  ).length -
                    1 && <ArrowSmallRightIcon className="w-4 h-4" />}
              </li>
            ))}
        </ol>
      </div>

      <div>
        {pokemonSpecies?.flavor_text_entries
          .filter((species) => species.language.name === 'ko')
          .map((species) => species.flavor_text)
          .at(-1)}
      </div>
    </Modal>
  );
}

export default PokemonInfoModal;
