import axios from 'axios';
import useSWR from 'swr';

interface usePokemonTypeProps {
  id: number | string;
}

export default function usePokemonType({ id }: usePokemonTypeProps) {
  const { data, error, isLoading } = useSWR(
    `/api/ability/${id}`,
    (url: string) => axios.get(url).then((res) => res.data),
  );

  return { data, error, isLoading };
}
