'use client';

import { usePokemonModalStore } from '@/shared/store/globalStore';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import usePokemonSpecies from '@/lib/client/usePokemonSpecies';
import Image from 'next/image';
import usePokemon from '@/lib/client/usePokemon';
import useSWR from 'swr';
import axios from 'axios';
import { PokemonAbilityRes, PokemonSpeciesResponse } from '@/interface/pokemon';
import { typeList } from '@/shared/resource';
import useEvolutionChain from '@/lib/client/useEvolutionChain';
import { makeDepthFirstList, toneDownColor } from '@/shared/algorithm';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import pokeball from '/public/pokeball-48.png';
import classNames from 'classnames';
import usePokemonType from '@/lib/client/usePokemonType';
import Tooltip from '@/components/tooltip';
import Link from 'next/link';

Modal.setAppElement('#modal-root');

function PokemonPage() {
  const pathname = usePathname();

  const id = usePokemonModalStore((state) => state.pokemonId);

  const { data: pokemonSpecies } = usePokemonSpecies({
    id: pathname.split('/').at(-1)!,
  });

  const { data: pokemonInfo } = usePokemon({ id: pathname.split('/').at(-1)! });

  const {
    data: pokemonAbils,
    error: pokemonAbilErr,
    isLoading: abilLoading,
  } = useSWR<PokemonAbilityRes[]>(
    pokemonInfo?.abilities
      ? pokemonInfo?.abilities.map((ability) => ability.ability.url)
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
    isLoading: isTreeLoading,
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

  const handleMoveToEvolutionaryTree = (id: number) => {};

  return (
    <main
      className={
        'flex flex-col min-h-screen bg-[#F6F8FE] dark:bg-black dark:text-white py-8'
      }
    >
      <div
        className={
          'flex w-[250px] mx-auto aspect-square border-2 rounded bg-white p-8 mb-8 relative'
        }
        style={{
          borderColor: pokemonSpecies?.color.name
            ? toneDownColor(pokemonSpecies?.color.name, 0.8)
            : '#bababa',
        }}
      >
        <Image
          src={pokemonInfo?.sprites.front_default ?? '/null.svg'}
          alt={'pokemon_thumbnail'}
          fill
        />
      </div>
      <div className="flex w-full justify-center mb-4">
        <h1 className="flex items-center font-bold text-xl gap-1 ">
          <Image src={pokeball} alt={'poke-ball'} className="w-6 h-6" />

          <span className="font-medium text-lg">No.{pokemonInfo?.id}</span>

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
            <th
              style={{
                backgroundColor: pokemonSpecies?.color.name
                  ? toneDownColor(pokemonSpecies?.color.name, 0.8)
                  : '#bababa',
              }}
              className="py-2"
            >
              분류
            </th>
            <th
              style={{
                backgroundColor: pokemonSpecies?.color.name
                  ? toneDownColor(pokemonSpecies?.color.name, 0.8)
                  : '#bababa',
              }}
              className="py-2"
            >
              키/몸무게
            </th>
            <th
              style={{
                backgroundColor: pokemonSpecies?.color.name
                  ? toneDownColor(pokemonSpecies?.color.name, 0.8)
                  : '#bababa',
              }}
              className="py-2"
            >
              타입
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          <tr>
            <td className="text-center bg-white py-2">
              {
                pokemonSpecies?.genera.find(
                  (genus) => genus.language.name === 'ko',
                )?.genus
              }
            </td>
            <td className="text-center bg-white py-2">
              {pokemonInfo && `${pokemonInfo?.height / 10}m`}/
              {pokemonInfo && `${pokemonInfo?.weight / 10}kg`}
            </td>
            <td className="text-center bg-white py-2">
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

      <div className="flex flex-col items-center mb-6">
        <h2 className="font-bold mb-4">진화단계</h2>
        {isTreeLoading ? (
          <div>is loading...</div>
        ) : (
          <ol className="flex items-center gap-2">
            {pokemonEvolutionTree
              ?.filter((tree) =>
                tree.names.find((tree) => tree.language.name === 'ko'),
              )
              .map((tree, idx) => (
                <li
                  key={tree.id}
                  className="flex items-center font-bold gap-2 hover:text-black"
                  onClick={() => handleMoveToEvolutionaryTree(tree.id)}
                >
                  <Link href={`/${tree.id}`}>
                    <span
                      className={`cursor-pointer rounded-full py-1 px-2 font-medium border text-white`}
                      style={{
                        backgroundColor: pokemonSpecies?.color.name
                          ? toneDownColor(pokemonSpecies?.color.name, 0.8)
                          : '#bababa',
                      }}
                    >
                      {
                        tree.names.find((name) => name.language.name === 'ko')
                          ?.name
                      }
                    </span>
                  </Link>
                  {idx <
                    pokemonEvolutionTree?.map(
                      (tree) =>
                        tree.names.find((tree) => tree.language.name === 'ko')
                          ?.name,
                    ).length -
                      1 && (
                    <ArrowSmallRightIcon className="w-4 h-4 text-black" />
                  )}
                </li>
              ))}
          </ol>
        )}
      </div>

      <div className="flex flex-col w-full items-center mb-6">
        <h2 className="font-bold mb-2">특성</h2>
        {abilLoading ? (
          <div>is loading...</div>
        ) : (
          <ul className="flex flex-col items-center">
            {pokemonAbils?.map((ability) => (
              <li key={ability.id}>
                <Tooltip
                  tooltipTxt={
                    ability.flavor_text_entries.find(
                      (flavor) => flavor.language.name === 'ko',
                    )?.flavor_text ?? ''
                  }
                >
                  <span className="cursor-pointer ">
                    {
                      ability.names.find((name) => name.language.name === 'ko')
                        ?.name
                    }
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col items-center mb-6">
        <h2 className="font-bold mb-2">생태</h2>
        <div className="text-center">
          {pokemonSpecies?.flavor_text_entries
            .filter((species) => species.language.name === 'ko')
            .map((species) => species.flavor_text)
            .at(-1)}
        </div>
      </div>
    </main>
  );
}
export default PokemonPage;
