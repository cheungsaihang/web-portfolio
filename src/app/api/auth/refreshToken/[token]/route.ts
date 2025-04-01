import { NextRequest } from "next/server";
import { getAuthorizationHeader } from "@/utils/nextRequest";
import { ApiResponse } from "@/utils/nextResponse";
import { db } from "@/modules/server/firebase";
import { generateUserTokens } from "@/utils/userTokens";
import { FS_RefreshTokensSchema } from "@/modules/server/firebase/schemas/refreshTokens.schema";
import { FS_UsersSchema } from "@/modules/server/firebase/schemas/users.schema";

type RequestBody = {
  token:string;
}
export async function DELETE(request:NextRequest, context: { params: Promise<RequestBody> } ) {
  const { token } = await context.params;
  const accessToken = getAuthorizationHeader(request)('Bearer');
  if(!accessToken){
    return ApiResponse(404,{ short:'access_token_is_missing', message: 'access token is missing'});
  }
  const refreshToken = token;
  const deletedRecords = await db.deleteDocs('refreshTokens',{
    queries:{
      accessToken:accessToken,
      refreshToken:refreshToken
    }
  })();
  return ApiResponse(200,{
    deleted: Array.isArray(deletedRecords) ? deletedRecords.length : (deletedRecords ? 1 : null)
  });
}

export async function GET(request:NextRequest, context: { params: Promise<RequestBody> } ){
  const { token } = await context.params;
  //Check Bearer token whether it is missing
  const accessToken = getAuthorizationHeader(request)('Bearer');
  if(!accessToken){
    return ApiResponse(404,{ short:'access_token_is_missing', message: 'access token is missing'});
  }
  //Fetch data from refreshTokens collection
  const refreshToken = token;
  const result = await db.queryDocs('refreshTokens',{ 
    where: [{condition:'equal',field:'accessToken',keyword:accessToken},{condition:'equal',field:'refreshToken',keyword:refreshToken }], 
    length: 1 
  })();

  if(!result){  
    return ApiResponse(405,{ short:'refresh_token_not_found', message: 'Can not find refresh token record'});
  }
  //Check refresh token whether it is expired
  const refreshTokenId = result.docs[0].id;
  const refreshTokenDoc = result.docs[0].data() as FS_RefreshTokensSchema;
  const now = new Date(Date.now()).getTime();
  if(now > refreshTokenDoc.expiresAt){
    return ApiResponse(406,{ short:'refresh_token_is_expired', message: 'Refresh token is expired'});
  }
  //Fetch user record
  const userRes = await db.getDoc('users',refreshTokenDoc.userId)();
  if(!userRes){
    return ApiResponse(407,{ short:'user_not_found', message: 'Can not find user record by refresh token'});
  }
  //Generate new user token and replace to old one
  const user = userRes.data() as FS_UsersSchema;
  const userId = userRes.id;
  const email = user.email;
  const tokens = await generateUserTokens({userId, email});
  
  //Update refreshTokens
  db.setDoc('refreshTokens',refreshTokenId,{
    userId:userId,
    accessToken:tokens.accessToken,
    refreshToken:tokens.refreshToken,
    expiresAt:tokens.refreshTokenExpire.getTime()
  })();

  return ApiResponse(200,{
    accessToken:tokens.accessToken,
    refreshToken:tokens.refreshToken
  });
}