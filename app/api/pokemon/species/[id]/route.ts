import { fetchPokemonSpecies } from '@/lib/client/pokemon';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const pokemon = await fetchPokemonSpecies(
    String(req.nextUrl.pathname.split('/').at(-1)),
  );

  return NextResponse.json(pokemon);
}
