# pokedex
 pokeapiv2를 활용한 nextjs13 및 ssrtest 사이드 프로젝트.
 여러 포켓몬에 대한 리스트 및 상세 정보 조회


## 링크
https://pokedex-flax-delta.vercel.app/

## 사용기술
 - Nextjs13
 - TailwindCSS
 - embla-carousel-react
 - SWR
 - Zustand

## 디렉토리 구조
```
pokedex
├─ .eslintrc.json
├─ .gitattributes
├─ .gitignore
├─ app
│  ├─ api //api route
│  │  └─ pokemon
│  │     ├─ ability // 포켓몬 고유 기능 조회
│  │     │  └─ [id]
│  │     │     └─ route.ts
│  │     ├─ default
│  │     │  └─ route.ts
│  │     ├─ evolution // 포켓몬 진화체인
│  │     │  └─ [id]
│  │     │     └─ route.ts
│  │     ├─ route.ts
│  │     ├─ species // 포켓몬 종 세부 정보
│  │     │  └─ [id]
│  │     │     └─ route.ts
│  │     └─ [id] // 특정 포켓몬 조회
│  │        └─ route.ts
│  ├─ components // 재사용 컴포넌트 조각
│  │  ├─ area
│  │  │  └─ pokemonListArea.tsx
│  │  ├─ footer.tsx
│  │  ├─ header.tsx
│  │  ├─ modalPortal.tsx
│  │  ├─ pokemonCard.tsx
│  │  ├─ pokemonInfoModal.tsx
│  │  ├─ pokemonList.tsx
│  │  ├─ searchBar.tsx
│  │  └─ tooltip.tsx
│  ├─ favicon.ico
│  ├─ globals.scss
│  ├─ interface
│  │  └─ pokemon.ts
│  ├─ layout.tsx
│  ├─ lib
│  │  └─ client // api 호출 함수 등
│  │     ├─ config.ts
│  │     ├─ pokemon.ts
│  │     ├─ useEvolutionChain.ts
│  │     ├─ usePokemon.ts
│  │     ├─ usePokemonDefault.ts
│  │     ├─ usePokemons.ts
│  │     ├─ usePokemonSpecies.ts
│  │     └─ usePokemonType.ts
│  ├─ page.tsx // 메인페이지
│  ├─ shared // 공통 리소스 (알고리즘 등)
│  │  ├─ algorithm.ts
│  │  ├─ instance.ts
│  │  ├─ resource.ts
│  │  └─ store
│  │     └─ globalStore.ts
│  └─ [name] // 포켓몬 세부페이지   
│     └─ page.tsx
├─ next.config.js
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ next.svg
│  ├─ null.svg
│  ├─ pika-48.png
│  ├─ pika-96.png
│  ├─ pokeball-48.png
│  ├─ pokeball-96.png
│  └─ vercel.svg
├─ README.md
├─ tailwind.config.ts
├─ tsconfig.json
└─ yarn.lock

```
