import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sessionCookies, sessionApi } from './utils/sesstion';
 
export default async function middleware(request: NextRequest) {
  const protectedRoutes = ['/profile'];
  const publicRoutes = ['/login'];
  const logoutRoutes = ['/logout'];

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isLogoutRoute = logoutRoutes.includes(pathname);

  const session = await sessionCookies();
  const [accessToken, refreshToken] = session.get();

  //Logout Route - cookies delete function must be in server action or middleware
  if(isLogoutRoute){
    session.clear();
    if(accessToken && refreshToken){
      await sessionApi(accessToken).clear(refreshToken);
    }
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  //Protected Route - require authentication page
  if(isProtectedRoute){
    if(!accessToken){
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    const isSuccess = await sessionApi(accessToken).validate();
    const newSessionTokens = !isSuccess && refreshToken && await sessionApi(accessToken).refresh(refreshToken);
    if(!isSuccess){
      if(!newSessionTokens){
        session.clear();
        return NextResponse.redirect(new URL('/login', request.nextUrl));
      }
      //Refresh Tokens Success
      const [newAccessTokens, newRefreshTokens] = newSessionTokens;
      session.set(newAccessTokens,newRefreshTokens)
    }
  }
  //Public Route - require logged out page
  if(isPublicRoute && accessToken){
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  return NextResponse.next();
}

//"Matching Paths" config
export const config = {
  matcher: ['/login','/logout','/profile'],
}
