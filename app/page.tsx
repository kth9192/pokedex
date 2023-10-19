import PokemonListArea from '@/components/area/pokemonListArea';

export default function Home() {
  // const { playlist, isLoading, error } = usePlaylist();

  // if (error) return <div>failed to load</div>;

  // if (isLoading) return <div>loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-[#F6F8FE] dark:bg-black dark:text-white">
      {/* <div className="flex flex-col gap-2">
        <h2 className="text-white text-2xl font-bold">Now Trending</h2>
        {playlist && <PlayListcarousel items={playlist} />}
      </div> */}

      <h1 className=" mb-6">Nextjs13 테스트 프로젝트 - 포켓몬 도감</h1>

      <PokemonListArea />
    </main>
  );
}
