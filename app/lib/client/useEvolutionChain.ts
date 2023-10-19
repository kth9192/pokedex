import { PokemonEvolutionChain } from '@/interface/pokemon';
import axios from 'axios';
import useSWR from 'swr';

interface useEvolutionChainProps {
  id: number;
}

export default function useEvolutionChain({ id }: useEvolutionChainProps) {
  const { data, error, isLoading } = useSWR<PokemonEvolutionChain>(
    () => (id ? `/api/pokemon/evolution/${id}` : null),
    (url) => axios.get(url).then((res) => res.data),
  );

  return {
    data,
    error,
    isLoading,
  };
}
