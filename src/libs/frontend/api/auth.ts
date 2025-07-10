"use server"
import { API_Response } from "@/types/api";
import { API_RefreshTokens } from "@/types/api/refreshTokens";
import { API_LoginResult, API_UsersSchema } from "@/types/api/users";
import { sessionCookies } from "@/utils/cookies";
import { isErrorResponse } from "@/utils/nextResponse";

const authUrl = `${process.env.API_ENDPOINT}/api/auth`;
const profileUrl = `${process.env.API_ENDPOINT}/api/user`;

export async function getProfile() {
  const [accessToken] = (await sessionCookies()).get();
  if(!accessToken){
    return null;
  }
  const res = await fetch(profileUrl, {
    method: 'GET',
    ...authOptions(accessToken)
  });
  const body = await res.json() as API_Response<API_UsersSchema>;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}

export async function login({
  email,
  password
}:{
  email:string;
  password:string;
}){
  const res = await fetch(`${authUrl}/login`,{
    method: 'POST',
    body: JSON.stringify({email,password}),
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    cache: 'no-store' 
  });
  return await res.json() as API_Response<API_LoginResult>;
}

export async function validateAccessToken(){
  const [accessToken] = (await sessionCookies()).get();
  if(!accessToken){
    return false;
  }
  const res = await fetch(`${authUrl}/validate`,{
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
    `${authUrl}/refreshToken/${refreshToken}`,{
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
  await fetch(`${authUrl}/refreshToken/${refreshToken}`,{
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