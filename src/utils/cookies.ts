"use server"
import { cookies } from "next/headers";

export async function sessionCookies(){
  const cookiesFn = await cookies();
  const get = () => {
    const accessToken = cookiesFn.get('sid')?.value;
    const refreshToken = cookiesFn.get('rsid')?.value;
    return [accessToken, refreshToken] as const;
  }
  const set = (accessToken:string,refreshToken:string) => {
    const secureOption = {
      httpOnly:true,
      secure: process.env.NODE_ENV == 'development' ? false : true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
    cookiesFn.set('sid',accessToken, secureOption);
    cookiesFn.set('rsid',refreshToken, secureOption);
  }
  // Problem in Safari - only deleted one cookie when secure:true in production
  // const clear = () => {
  //   cookiesFn.delete('sid');
  //   cookiesFn.delete('rsid');
  // }

  return {
    get,
    set,
  }
}