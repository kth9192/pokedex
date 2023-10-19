import { PokemonDefaultRes } from '@/interface/pokemon';
import axios from 'axios';
import useSWR from 'swr';

export default function usePokemonDefault() {
  const { data, isLoading, error } = useSWR<PokemonDefaultRes>(
    '/api/pokemon/default',
    (url: string) => axios.get(`${url}`).then((res) => res.data),
  );

  return {
    data,
    isLoading,
    error,
  };
}
