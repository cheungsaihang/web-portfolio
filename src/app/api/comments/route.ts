import { type NextRequest } from "next/server"
import { ApiResponse } from "@/utils/nextResponse"
import { getAllParams, getAuthorizationHeader, getPostParams } from "@/utils/nextRequest"
import { decrypt } from "@/utils/userTokens";
import { db } from "@/modules/server/firebase";
import { FS_CommentsSchema } from "@/modules/server/firebase/schemas/comments.schema";
import { FS_UsersSchema } from "@/modules/server/firebase/schemas/users.schema";
import { API_UsersSchema } from "@/types/api/users";

type RequestBody = {
  type:string;
  docId:string;
  comment:string;
}

//Get Comments
export async function GET(request:NextRequest){
  const [collectionType, docId] = getAllParams(request)('type','id');
  if(!collectionType || !docId){
    return ApiResponse(400,{ short:'invaild_api_call', message: 'Query string parameters type or id is/are missing'});
  }
  const comments = await db.queryDocs('comments',{
    where:[
      {field:'collectionType',keyword:collectionType,condition:'equal'},
      {field:'collectionDoc',keyword:docId,condition:'equal'},
    ]
  })();

  if(!comments){
    return ApiResponse(200,{
      records: null,
    });
  }

  const userProfile = new Map();
  const userIds = comments.docs.map(doc => {
    const item = doc.data() as FS_CommentsSchema;
    return item.userId;
  });
  const users = await db.queryDocs('users',{
    where:[{ field:'id', condition:'in', keyword:userIds }]
  })();
  users?.docs.forEach(doc => {
    const item = doc.data() as FS_UsersSchema;
    userProfile.set(doc.id,(item.firstname + " " + item.lastname));
  });
  const convertedComments = comments.docs.map(doc => {
    const item = doc.data() as FS_CommentsSchema;
    return {
      ...item,
      commentId:doc.id,
      userName:userProfile.get(item.userId)
    }
  });
  return ApiResponse(200,{
    records: convertedComments,
    pagination:{
      currentPage:1,
      isMorePage:false
    }
  });
}

//Add Comment
export async function POST(request:NextRequest){
  const body = await getPostParams<RequestBody>(request);

  if(!body?.comment || !body?.type || !body?.docId){
    return ApiResponse(400,{ short:'invaild_api_call', message: 'parameters comment, type or docId is/are missing'});
  }
  const bearerToken = getAuthorizationHeader(request)('Bearer');
  if(!bearerToken){
    return ApiResponse(400,{ short:'access_token_not_found', message: 'Can not find access token'});
  }  
  const jwtResult = await decrypt(bearerToken);
  if(!jwtResult || !jwtResult.userId || !jwtResult.email){
    return ApiResponse(401,{ short:'access_token_invalid', message: 'Access token is invalid'});
  }
  const oldComments = await db.queryDocs('comments',{
    where:[
      {field:'collectionType',keyword:body.type,condition:'equal'},
      {field:'collectionDoc',keyword:body.docId,condition:'equal'},
    ]
  })();

  if(oldComments?.size && oldComments.size >= 5){
    return ApiResponse(406,{ short:'comments_over_limit', message: 'Maximum 5 comments only for each post has been accepted.'});
  }

  const userId = jwtResult.userId as string;
  const createdAt = Date.now();
  const result = await db.addDoc('comments',{
    userId:userId,
    collectionType:body.type,
    collectionDoc:body.docId,
    comment:body.comment,
    createdAt:createdAt
  })();
  if(!result?.success){
    return ApiResponse(500,{ short:'cannot_add_comment', message: 'Cannot add comment, Please contact admin to resolve problem.'});
  }

  const userDoc = await db.getDoc('users',userId)();
  const user = userDoc ? userDoc.data() as API_UsersSchema : null;
  const userName = user ? (user.firstname + ' ' + user.lastname) : '';

  return ApiResponse(201,{
    userId:userId,
    userName:userName,
    createdAt:createdAt,
    commentId:result.docId,
    comment:body.comment,
    collectionDoc: body.docId,
    collectionType: body.type
  });
}