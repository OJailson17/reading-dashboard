import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  {
    path: '/login',
    whenAuthenticated: 'redirect',
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login';

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get('session');

  // route is public and user is not authenticated
  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // route is private and user is not authenticated
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  // route is public and user is authenticated
  if (authToken && publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = '/';

    return NextResponse.redirect(redirectUrl);
  }

  // route is private and user is authenticated
  if (authToken && !publicRoute) {
    // check if token is expired

    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
