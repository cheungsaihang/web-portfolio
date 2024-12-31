import ProfileContent from "./content";
import { sessionCookies } from "@/utils/sesstion";
import { API_UsersSchema } from "@/types/api/users";
import { API_Error, API_Success } from "@/types/api";
import { isErrorResponse } from "@/utils/nextResponse";

export default async function Page() {
  const [accessToken] = (await sessionCookies()).get();
  const authUser = accessToken ? await getUser(accessToken) : null;
  return ( 
    <ProfileContent user={authUser} />
  );
}

async function getUser(accessToken:string) {
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