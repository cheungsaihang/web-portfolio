import { db } from "@/modules/server/firebase";
import { FS_CommentsSchema } from "@/modules/server/firebase/schemas/comments.schema";
import { getAuthorizationHeader } from "@/utils/nextRequest";
import { ApiResponse } from "@/utils/nextResponse";
import { decrypt } from "@/utils/userTokens";
import { NextRequest } from "next/server";

type RequestBody = {
  commentId:string;
}

//Delete Comment
export async function DELETE(request:NextRequest, context: { params: Promise<RequestBody> } ){
  const { commentId } = await context.params;

  const bearerToken = getAuthorizationHeader(request)('Bearer');
  if(!bearerToken){
    return ApiResponse(400,{ short:'access_token_not_found', message: 'Can not find access token'});
  }  
  const jwtResult = await decrypt(bearerToken);
  if(!jwtResult || !jwtResult.userId || !jwtResult.email){
    return ApiResponse(401,{ short:'access_token_invalid', message: 'Access token is invalid'});
  }
  const doc = await db.getDoc('comments',commentId)();
  if(!doc){
    return ApiResponse(400,{ short:'record_not_found', message: 'Comment not found'});
  }
  const comment = doc.data() as FS_CommentsSchema;
  if(comment.userId != jwtResult.userId){
    return ApiResponse(401,{ short:'delete_not_allow', message: 'The comment is not owned by user'});
  }
  await db.deleteDocs('comments',{
    docId:commentId
  })();
  return ApiResponse(200,'success');
  
}