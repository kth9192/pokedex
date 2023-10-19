import { PokemonResponse } from '@/interface/pokemon';
import useSWR from 'swr';

interface usePokemonProps {
  pageNum: number;
}

export default function usePokemons({ pageNum }: usePokemonProps) {
  const { data, error, isLoading } = useSWR<PokemonResponse[]>(
    [`/api/pokemon`, pageNum],
    ([url, pageNum]) =>
      fetch(`${url}?pagenum=${pageNum}`).then((res) => res.json()),
  );

  console.log(data, data?.length);

  return {
    pokemonList: data,
    isLoading,
    error,
  };
}
