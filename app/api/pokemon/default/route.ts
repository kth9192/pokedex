import { getPokemonDefaultInfo, getPokemons } from '@/lib/client/pokemon';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const pokemon = await getPokemonDefaultInfo();

  return NextResponse.json(pokemon);
}
