import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sessionCookies } from './utils/cookies';
import { refreshAccessToken, clearSessionTokens, validateAccessToken  } from './libs/frontend/api/auth';
 
export default async function middleware(request: NextRequest) {
  const protectedRoutes = ['/profile'];
  const publicRoutes = ['/login'];
  const logoutRoutes = ['/logout'];

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isLogoutRoute = logoutRoutes.includes(pathname);

  //Logout Route - cookies delete function must be in server action or middleware
  if(isLogoutRoute){
    return await doLogoutRoute(request);
  }
  //Protected Route - require authentication page
  if(isProtectedRoute){
    return await doProtectedRoute(request);
  }
  //Public Route - require logged out page
  if(isPublicRoute){
    return await doPublicRoute(request);
  }
  return NextResponse.next();
}

async function doLogoutRoute(request: NextRequest){
  await clearSessionTokens();
  const response = NextResponse.redirect(new URL('/', request.nextUrl));
  response.cookies.delete('sid');
  response.cookies.delete('rsid');
  return response;
}

async function doProtectedRoute(request: NextRequest){
  const session = await sessionCookies();
  const [accessToken] = session.get();
  if(!accessToken){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  const isSuccess = await validateAccessToken();
  const newSessionTokens = !isSuccess && await refreshAccessToken();
  if(!isSuccess){
    if(!newSessionTokens){
      const response = NextResponse.redirect(new URL('/login', request.nextUrl));
      response.cookies.delete('sid');
      response.cookies.delete('rsid');
      return response;
    }
    //Refresh Tokens Success
    const [newAccessTokens, newRefreshTokens] = newSessionTokens;
    session.set(newAccessTokens,newRefreshTokens)
  }
  return NextResponse.next();
}

async function doPublicRoute(request: NextRequest){
  const [accessToken] = (await sessionCookies()).get();
  if(accessToken){
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  return NextResponse.next();
}

//"Matching Paths" config
export const config = {
  matcher: ['/login','/logout','/profile'],
}
