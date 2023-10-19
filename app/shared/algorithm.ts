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

export const toneDownColor = (color: string, factor: number) => {
  if (typeof color === 'string' && color) {
    // 주어진 값이 CSS 색상 문자열일 경우 계산된 RGB 값으로 파싱
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
    document.body.appendChild(tempElement); // 문서에 임시 요소 추가
    const computedColor = window.getComputedStyle(tempElement).color; // 계산된 color 값 가져오기
    document.body.removeChild(tempElement); // 임시 요소 제거

    // RGB 값을 추출하여 각 색상 채널을 주어진 factor 만큼 줄임
    const rgbValues: number[] = computedColor.match(/\d+/g)!.map(Number);

    const r = Math.floor(rgbValues[0] * factor);
    const g = Math.floor(rgbValues[1] * factor);
    const b = Math.floor(rgbValues[2] * factor);

    // 새로운 HEX 값을 만들어 반환
    return `#${(r < 255 ? (r < 16 ? '0' : '') : '') + r.toString(16)}${
      (g < 255 ? (g < 16 ? '0' : '') : '') + g.toString(16)
    }${(b < 255 ? (b < 16 ? '0' : '') : '') + b.toString(16)}`;
  } else {
    // 유효한 입력이 아닐 경우 에러 메시지 반환
    throw new Error('유효한 CSS 색상을 입력하세요.');
  }
};
