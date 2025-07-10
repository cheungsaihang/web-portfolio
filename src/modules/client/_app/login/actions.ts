"use server"
import { isErrorResponse } from "@/utils/nextResponse";
import { z } from "zod";
import { sessionCookies } from "@/utils/cookies";
import { asyncCompose } from "@/fps/compose";
import { login } from "@/libs/frontend/api/auth";

export async function loginAction(prevState:unknown, formData:FormData){ 
  
  const pipeline = asyncCompose(loginConverter,asyncCompose(login,loginDTO));

  try{
    const result = await pipeline(formData);
    (await sessionCookies()).set(result.token.accessToken, result.token.refreshToken);
    return { success: true };
  }
  catch(err){
    const catchedError = err as { cause:string, message:string };
    const error = catchedError.cause == "form_validation"
                  ? JSON.parse(catchedError.message) as { email?:string[], password?:string[] }
                  : { formSubmit:catchedError.message }
    return {
      error:{
        email: undefined, 
        password: undefined, 
        formSubmit:undefined,
        ...error
      } 
    }
  }
}

async function loginDTO(formData:FormData){
  const Zod_LoginValidationSchema = z.object({
    email: z.string().email({message: "請輸入正確電郵"}).trim(),
    password: z.string().min(8,{message: "密碼必須至少8位字串及數字" }).trim()
  });
  const validation = Zod_LoginValidationSchema.safeParse(Object.fromEntries(formData));

  if(!validation.success){
    throw Error(JSON.stringify({...validation.error.flatten().fieldErrors}),{ cause : 'form_validation'});
  }
  return validation.data
}

async function loginConverter(apiOutput:Awaited<ReturnType<typeof login>>){
  const errMsg = (short:string) => {
    switch (short){
      case "user_not_found":      return '沒有用戶記錄';
      case "password_not_match":  return '密碼錯誤';
      default:                    return '系統錯誤';
    }
  }
  if(isErrorResponse(apiOutput)){
    throw Error(errMsg(apiOutput.error.short), { cause: 'api' });
  }
  return apiOutput.result;
}