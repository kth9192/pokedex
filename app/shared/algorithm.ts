import {
  ChainLink,
  NamedAPIResource,
  PokemonEvolutionChain,
} from '@/interface/pokemon';

type GetChildrenFunction = (node: ChainLink) => ChainLink[];

export const depthFirst: (
  getChildren: GetChildrenFunction,
) => (tree: ChainLink) => ChainLink[] =
  (getChildren: GetChildrenFunction) => (tree: ChainLink) =>
    [tree, ...(getChildren(tree) || []).flatMap(depthFirst(getChildren))];

export const makeDepthFirstList: (
  pokes: PokemonEvolutionChain,
) => NamedAPIResource[] = (pokes) =>
  depthFirst((node) => node.evolves_to)(pokes.chain).map(
    ({ species }) => species,
  );

const breadthFirst: (
  getChildren: GetChildrenFunction,
) => (nodes: ChainLink[]) => ChainLink[] =
  (getChildren: GetChildrenFunction) => (nodes: ChainLink[]) => {
    const children = nodes.flatMap((node) => getChildren(node) || []);
    return [
      ...nodes,
      ...(children.length ? breadthFirst(getChildren)(children) : []),
    ];
  };

const makebreadthFirstList = (pokes: PokemonEvolutionChain) =>
  breadthFirst((node) => node.evolves_to)([pokes.chain]).map(
    ({ species }) => species,
  );
