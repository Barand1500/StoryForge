import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/';

  // Email confirmation için token_hash varsa confirm sayfasına yönlendir
  if (token_hash && type) {
    return NextResponse.redirect(`${origin}/auth/confirm?token_hash=${token_hash}&type=${type}`);
  }

  // OAuth callback için code varsa
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth hatası durumunda ana sayfaya yönlendir
  return NextResponse.redirect(`${origin}/?error=auth`);
}
