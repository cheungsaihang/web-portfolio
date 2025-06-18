import { API_Error, API_Success } from "@/types/api";
import { API_UsersSchema } from "@/types/api/users";
import { isErrorResponse } from "@/utils/nextResponse";
import { sessionCookies } from "@/utils/sesstion";

export async function getProfile() {
  const [accessToken] = (await sessionCookies()).get();
  if(!accessToken){
    return null;
  }
  const res = await fetch(process.env.API_ENDPOINT  + '/api/user', {
    method: 'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    }, 
    cache: 'no-store'
  });
  const body = await res.json() as API_Success<API_UsersSchema> | API_Error;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}