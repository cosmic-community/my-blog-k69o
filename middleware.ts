import { NextRequest, NextResponse } from 'next/server'

const FRAME_ANCESTORS = "frame-ancestors 'self' http://localhost:3040 http://localhost:3000 http://127.0.0.1:3040 https://app.cosmicjs.com https://*.cosmicjs.com"

const PREVIEW_COOKIE = 'cosmic_preview'
const PREVIEW_HEADER = 'x-cosmic-preview-token'

export function middleware(request: NextRequest) {
  const queryToken = request.nextUrl.searchParams.get('preview_token')
  const cookieToken = request.cookies.get(PREVIEW_COOKIE)?.value
  const token = queryToken || cookieToken || null

  // Forward the token to the server components on THIS request so the first
  // render inside the dashboard iframe already sees draft content.
  const requestHeaders = new Headers(request.headers)
  if (token) {
    requestHeaders.set(PREVIEW_HEADER, token)
  } else {
    requestHeaders.delete(PREVIEW_HEADER)
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', FRAME_ANCESTORS)

  if (queryToken) {
    response.cookies.set({
      name: PREVIEW_COOKIE,
      value: queryToken,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60,
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
