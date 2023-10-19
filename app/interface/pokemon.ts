export interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  types: Array<PokeponType>;
}

export interface PokemonDefaultRes {
  count: number;
}

export interface PokemonAbilityRes {
  id: number;
  name: string;
  names: Name[];
  flavor_text_entries: AbilityFalvorText[];
}

export interface AbilityFalvorText {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface PokeponType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSpeciesResponse {
  id: number;
  names: Array<Name>;
  genera: Array<Genus>;
  flavor_text_entries: Array<FlavorText>;
  evolves_from_species: NamedAPIResource;
  evolution_chain: { url: string };
  color: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
}

interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface PokemonEvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

interface EvolutionDetail {
  gender: number | null;
  min_affection: number | null;
  item: NamedAPIResource | null;
  trigger: NamedAPIResource | null;
  held_item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  needs_overworld_rain: boolean | null;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string | null;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean | null;
}
