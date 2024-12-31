import { type NextRequest } from "next/server"
import { ApiResponse } from "@/utils/nextResponse"
import { getAuthorizationHeader } from "@/utils/nextRequest"
import { decodeAccessToken } from "@/utils/userTokens";

export async function GET(request:NextRequest){
  const bearerToken = getAuthorizationHeader(request)('Bearer');
  if(!bearerToken){
    return ApiResponse(404,{ short:'access_token_not_found', message: 'Can not find access token'});
  }  
  const jwtResult = await decodeAccessToken(bearerToken);
  if(!jwtResult || !jwtResult.userId || !jwtResult.email){
    return ApiResponse(405,{ short:'access_token_invalid', message: 'Access token is invalid'});
  }
  return ApiResponse(200,{
    userId:jwtResult.userId,
    email:jwtResult.email
  });
}