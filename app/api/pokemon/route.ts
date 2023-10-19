import { getPokemonDefaultInfo, getPokemons } from '@/lib/client/pokemon';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const pokemon = await getPokemons(
    Number(req.nextUrl.searchParams.get('pagenum')),
  );
  return NextResponse.json(pokemon);
}
