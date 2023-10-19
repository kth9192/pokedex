import { fetchPokemon } from '@/lib/client/pokemon';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const pokemon = await fetchPokemon(
    Number(req.nextUrl.pathname.split('/').at(-1)),
  );

  return NextResponse.json(pokemon);
}
