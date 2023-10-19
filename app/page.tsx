import PokemonListArea from '@/components/area/pokemonListArea';
import PlayListcarousel from '@/components/playListcarousel';
import PokemonInfoModal from '@/components/pokemonInfoModal';
import PokemonList from '@/components/pokemonList';
import usePlaylist from '@/lib/client/usePlaylist';
import { usePokemonModalStore } from '@/shared/store/globalStore';
import { MouseEvent, KeyboardEvent } from 'react';

export default function Home() {
  // const { playlist, isLoading, error } = usePlaylist();

  // if (error) return <div>failed to load</div>;

  // if (isLoading) return <div>loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-[#F6F8FE]">
      {/* <div className="flex flex-col gap-2">
        <h2 className="text-white text-2xl font-bold">Now Trending</h2>
        {playlist && <PlayListcarousel items={playlist} />}
      </div> */}

      <h1 className=" mb-6">Nextjs13 테스트 프로젝트 - 포켓몬 도감</h1>

      <PokemonListArea />
    </main>
  );
}
