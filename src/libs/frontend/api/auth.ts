"use server"
import { API_Response } from "@/types/api";
import { API_RefreshTokens } from "@/types/api/refreshTokens";
import { API_UsersSchema } from "@/types/api/users";
import { sessionCookies } from "@/utils/cookies";
import { isErrorResponse } from "@/utils/nextResponse";

export async function getProfile() {
  const [accessToken] = (await sessionCookies()).get();
  if(!accessToken){
    return null;
  }
  const res = await fetch(process.env.API_ENDPOINT  + '/api/user', {
    method: 'GET',
    ...authOptions(accessToken)
  });
  const body = await res.json() as API_Response<API_UsersSchema>;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}

export async function validateAccessToken(){
  const [accessToken] = (await sessionCookies()).get();
  if(!accessToken){
    return false;
  }
  const res = await fetch(`${process.env.API_ENDPOINT}/api/auth/validate`,{
    ...authOptions(accessToken),
    method: 'GET',
  });
  const body = await res.json() as API_Response<string>;
  if(
    isErrorResponse(body) || 
    typeof body.result !== 'string' || 
    body.result.toUpperCase() != "SUCCESS"
  ){
    return false;
  }
  return true;
}

export async function refreshAccessToken(){
  const [accessToken, refreshToken] = (await sessionCookies()).get();
  if(!accessToken || !refreshToken){
    return null;
  }
  const res = await fetch(
    `${process.env.API_ENDPOINT}/api/auth/refreshToken/${refreshToken}`,{
    ...authOptions(accessToken),
    method: 'GET',
  });
  const body = await res.json() as API_Response<API_RefreshTokens>;
  if(isErrorResponse(body)){
    return null;
  }
  return [body.result.accessToken, body.result.refreshToken] as const;
}

export async function clearSessionTokens(){
  const [accessToken, refreshToken] = (await sessionCookies()).get();
  if(!accessToken || !refreshToken){
    return null;
  }  
  await fetch(`${process.env.API_ENDPOINT}/api/auth/refreshToken/${refreshToken}`,{
    ...authOptions(accessToken),
    method: 'DELETE'
  }); 
}

function authOptions(accessToken:string){
  return {
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    },
    cache: 'no-store' 
  } as RequestInit
}