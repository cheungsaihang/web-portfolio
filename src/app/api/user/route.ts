import { type NextRequest } from "next/server"
import { ApiResponse } from "@/utils/nextResponse"
import { getAuthorizationHeader } from "@/utils/nextRequest"
import { decrypt } from "@/utils/userTokens";
import { prepareGetDoc } from "@/modules/server/firebase";
import { FS_UsersSchema } from "@/modules/server/firebase/schemas/users.schema";

export async function GET(request:NextRequest){
  const bearerToken = getAuthorizationHeader(request)('Bearer');
  if(!bearerToken){
    return ApiResponse(504,{ short:'access_token_not_found', message: 'Can not find access token'});
  }  
  const jwtResult = await decrypt(bearerToken);
  if(!jwtResult || !jwtResult.userId || !jwtResult.email){
    return ApiResponse(505,{ short:'access_token_invalid', message: 'Access token is invalid'});
  }
  const userId = jwtResult.userId as string;
  const getDocFn = prepareGetDoc('users',userId);
  const doc = await getDocFn();
  if(!doc){
    return ApiResponse(404,{ short:'user_not_found', message: 'Can not find user record'});
  }
  const user = doc.data() as FS_UsersSchema;
  return ApiResponse(200,{
    id:doc.id,
    email:user.email,
    firstname:user.firstname,
    lastname:user.lastname
  });
}