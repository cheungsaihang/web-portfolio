"use server"
import { API_Error, API_Success } from "@/types/api";
import { API_LoginResult } from "@/types/api/users";
import { isErrorResponse } from "@/utils/nextResponse";
import { z } from "zod";
import { sessionCookies } from "@/utils/sesstion";

const Zod_LoginValidationSchema = z.object({
  email: z.string().email({message: "請輸入正確電郵"}).trim(),
  password: z.string().min(8,{message: "密碼必須至少8位字串及數字" }).trim()
});

export async function login(prevState:unknown, formData:FormData){ 
  const validation = Zod_LoginValidationSchema.safeParse(Object.fromEntries(formData));
  const defaultError = { email: undefined, password: undefined, formSubmit:undefined };

  if(!validation.success){
    return {
      error:{
        ...defaultError,
        ...validation.error.flatten().fieldErrors
      }
    }
  }
  const { email, password } = validation.data;
  const login = await doLogin(email,password);
  if(isErrorResponse(login)){
    switch (login.error.short){
      case "user_not_found":
        return { error: { ...defaultError, formSubmit: '沒有用戶記錄' } }
      case "password_not_match":
        return { error: { ...defaultError, formSubmit: '密碼錯誤' } }
      default:
        return { error: { ...defaultError, formSubmit: '系統錯誤' } }
    }
  }
  (await sessionCookies()).set(login.result.token.accessToken, login.result.token.refreshToken);
  return { success: true };
}

async function doLogin(email:string,password:string){
  const res = await fetch(`${process.env.API_ENDPOINT}/api/auth/login`,{
    method: 'POST',
    body: JSON.stringify({email,password}),
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    cache: 'no-store' 
  });
  return await res.json() as API_Success<API_LoginResult> | API_Error;
}