import { PokemonResponse } from '@/interface/pokemon';
import axios from 'axios';
import useSWR from 'swr';

interface usePokemonByIdProps {
  id: number | string;
}

export default function usePokemon({ id }: usePokemonByIdProps) {
  const { data, error, isLoading } = useSWR<PokemonResponse>(
    id !== -1 ? `/api/pokemon/${id}` : null,
    (url) => axios.get(url).then((res) => res.data),
  );

  console.log(data);

  return { data, error, isLoading };
}
