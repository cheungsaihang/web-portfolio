"use server"
import { API_Error, API_Success } from '@/types/api';
import { isErrorResponse } from '@/utils/nextResponse';
import { sessionCookies } from '@/utils/sesstion';
import { AccessTokenPayload } from '@/utils/userTokens';

export async function decodeAccessToken(){
  const [accessToken] =  (await sessionCookies()).get();
  if(!accessToken){
    return null;
  }
  const res = await fetch(`${process.env.API_ENDPOINT}/api/auth/decode`,{
    method: 'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    },
    cache: 'no-store' 
  });
  const body = await res.json() as API_Success<AccessTokenPayload> | API_Error;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}