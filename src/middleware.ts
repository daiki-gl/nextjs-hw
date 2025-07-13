import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証が必要なルートのパスを定義します。
const PROTECTED_ROUTES = ['/', '/search', '/add']

const LOGIN_PAGE_PATH = '/login'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')

  const currentPath = request.nextUrl.pathname

  const isProtectedRoute = PROTECTED_ROUTES.includes(currentPath)

  const isLoginPage = currentPath === LOGIN_PAGE_PATH

  if (isProtectedRoute && !authToken) {
    // ただし、現在ログインページにいる場合はリダイレクトしない (無限リダイレクトループ防止)
    if (isLoginPage) {
      return NextResponse.next()
    }

    const loginUrl = new URL(LOGIN_PAGE_PATH, request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (authToken && isLoginPage) {
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // 以下のパスを除くすべてのパスでミドルウェアを実行します:
    // この正規表現は、「_next/static, _next/image, favicon.ico, api」を含まないすべてのパスにマッチします。
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
