import { fetchPokemonAbility } from '@/lib/client/pokemon';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const ability = await fetchPokemonAbility(
    Number(req.nextUrl.pathname.split('/').at(-1)),
  );

  return NextResponse.json(ability);
}
