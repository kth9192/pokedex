import { PokemonSpeciesResponse } from '@/interface/pokemon';
import axios from 'axios';
import React, { useEffect } from 'react';
import useSWR from 'swr';

interface usePokemonSpeciesProps {
  id: number | string;
}

export default function usePokemonSpecies({ id }: usePokemonSpeciesProps) {
  const { data, error, isLoading } = useSWR<PokemonSpeciesResponse>(
    () => (id !== -1 ? `/api/pokemon/species/${id}` : null),
    (url) => axios.get(url).then((res) => res.data),
  );

  console.log(data);

  return { data, error, isLoading };
}
