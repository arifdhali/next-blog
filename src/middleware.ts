import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
export async function middleware(request: NextRequest) {
  let cookie = await cookies();
  let token = cookie.get('USER_TOKEN')?.value;
  let redirectURL = new URL('/login', request.url);
  if (!token) {
    return NextResponse.redirect(redirectURL);
  }
  let response = NextResponse.next();

  return response;

}

export const config = {
  matcher: '/dashboard/:path*',
}