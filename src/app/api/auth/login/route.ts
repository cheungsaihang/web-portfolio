import { type NextRequest } from "next/server"
import { db } from "@/modules/server/firebase";
import { FS_UsersSchema }  from "@/modules/server/firebase/schemas/users.schema";
import bcrypt from 'bcrypt'
import { generateUserTokens } from "@/utils/userTokens";
import { getPostParams } from "@/utils/nextRequest";
import { ApiResponse } from "@/utils/nextResponse";

type RequestBody = {
  email:string;
  password:string;
}

export async function POST(request: NextRequest) {
  //Check post params
  const body = await getPostParams<RequestBody>(request);
  if(!body || !body?.email || !body?.password){
    return ApiResponse(406, { short:'missing_email_or_password', message: 'Email or Password is missing.' });
  }
  //Check user record whether it is existed
  const { email, password } = body;
  const result = await db.queryDocs('users', { 
    where: [{ condition:'equal',field:'email',keyword:email}], 
    length: 1,
  })();
  if(!result){  
    return ApiResponse(404,{ short:'user_not_found', message: 'Can not user record'});
  }
  //Check user password and input password whether they are matched
  const userId = result.docs[0].id;
  const user = result.docs[0].data() as FS_UsersSchema;
  const isSuccess = await bcrypt.compare(password, user.password);
  if(!isSuccess){
    return ApiResponse(405, { short:'password_not_match', message: 'Password not matched' });
  }
  //Generate bearer token and response login success
  const tokens = await generateUserTokens({userId:userId, email:email.charAt(0)});
  db.addDoc('refreshTokens',{
    userId:userId,
    accessToken:tokens.accessToken,
    refreshToken:tokens.refreshToken,
    expiresAt:tokens.refreshTokenExpire.getTime()
  })();

  return ApiResponse(200,{
      user:{
        id:userId,
        email:user.email,
        firstname:user.firstname,
        lastname:user.lastname
      },
      token:{
        accessToken:tokens.accessToken,
        refreshToken:tokens.refreshToken
      }
  });
}