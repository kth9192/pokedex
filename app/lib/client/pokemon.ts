import {
  PokemonDefaultRes,
  PokemonResponse,
  PokemonSpeciesResponse,
} from '@/interface/pokemon';

export async function fetchPokemon(
  id: number | string,
): Promise<PokemonResponse> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function fetchPokemonSpecies(
  id: number | string,
): Promise<PokemonSpeciesResponse> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    return res.json();
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export const getPokemons = async (
  pageNum: number,
): Promise<PokemonResponse[]> => {
  const data = Array.from({ length: 20 }, async (_, i) => {
    const resource = (pageNum - 1) * 20 + i + 1;
    const result = await fetchPokemon(resource);
    const pokemonSpecies = await fetchPokemonSpecies(resource);

    console.log('resource', resource);

    return {
      ...result,
      name:
        pokemonSpecies.names.find((name) => name.language.name === 'ko')
          ?.name || result.name,
    };
  });

  return Promise.all(data)
    .then((res) => {
      return res.map((pokeInfo) => pokeInfo);
    })
    .catch((err) => {
      console.log(err);

      throw err;
    });
};

export const getPokemonDefaultInfo = async (): Promise<PokemonDefaultRes> => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon');

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchEvolutionChain = async (id: number) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`);

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchPokemonAbility = async (id: number) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);

    return res.json();
  } catch (error) {
    throw error;
  }
};
