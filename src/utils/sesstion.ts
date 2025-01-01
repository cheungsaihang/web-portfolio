// "use server"
import { cookies } from "next/headers";
import { isErrorResponse } from "./nextResponse";
import { API_Success, API_Error } from "@/types/api";
import { API_RefreshTokens } from "@/types/api/refreshTokens";

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
  const clear = () => {
    cookiesFn.delete('sid');
    cookiesFn.delete('rsid');
  }

  return {
    get,
    set,
    clear
  }
}

export function sessionApi(accessToken:string){
  const options:RequestInit = {
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    },
    cache: 'no-store' 
  }
  const validate = async () => {
    const res = await fetch(`${process.env.API_ENDPOINT}/api/auth/validate`,{
      ...options,
      method: 'GET',
    });
    const body = await res.json() as API_Success<string> | API_Error;
    if(
      isErrorResponse(body) || 
      typeof body.result !== 'string' || 
      body.result.toUpperCase() != "SUCCESS"
    ){
      return false;
    }
    return true;
  }
  const refresh = async (refreshToken:string) => {
    const res = await fetch(`${process.env.API_ENDPOINT}/api/auth/refreshToken/${refreshToken}`,{
      ...options,
      method: 'PUT'
    });
    const body = await res.json() as API_Success<API_RefreshTokens> | API_Error;
    if(isErrorResponse(body)){
      return null;
    }
    return [body.result.accessToken, body.result.refreshToken] as const;
  }
  const clear = async (refreshToken:string) => {
    await fetch(`${process.env.API_ENDPOINT}/api/auth/refreshToken/${refreshToken}`,{
      ...options,
      method: 'DELETE'
    }); 
  }
  return {
    validate,
    refresh,
    clear
  }
}
