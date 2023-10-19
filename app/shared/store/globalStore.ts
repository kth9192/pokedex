import { create } from 'zustand';

interface PokemonModalState {
  isOpen: boolean;
  convertModalState: () => void;
  pokemonId: number | string;
  setPokemon: (id: number) => void;
}

interface PokemonListState {
  pageNum: number;
  setPageNum: (num: number) => void;
}

export const usePokemonModalStore = create<PokemonModalState>((set) => ({
  isOpen: false,
  pokemonId: -1,

  convertModalState: () => set((state) => ({ isOpen: !state.isOpen })),
  setPokemon: (id) => set((state) => ({ pokemonId: id })),
}));

export const usePokemonListStore = create<PokemonListState>((set) => ({
  pageNum: 1,
  setPageNum: (num) => set((state) => ({ pageNum: num })),
}));
