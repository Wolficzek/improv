import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const PUBLIC_PATHS = [
  '/login', // your login page
  '/api/auth', // next‑auth callbacks
  '/_next', // Next.js internals
  '/favicon.ico', // favicon
]

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/sleep', origin))
    }
    return NextResponse.next()
  }

  console.log({
    headers: req.headers,
    cookies: req.cookies,
    secret: process.env.NEXTAUTH_SECRET,
    token: token,
  })

  if (!token) {
    const loginUrl = new URL('/login', origin)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
