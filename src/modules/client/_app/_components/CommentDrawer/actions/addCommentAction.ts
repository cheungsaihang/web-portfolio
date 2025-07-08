"use server"
import { z } from "zod";
import { isErrorResponse } from "@/utils/nextResponse";
import { API_Comments } from "@/types/api/comments";
import { addComment } from "@/libs/frontend/api/comment";
import { isValidHobby } from "@/utils/common";
import { asyncCompose } from "@/fps/compose";

export default async function addCommentAction(prevState:unknown, formData:FormData):Promise<SubmitResult>{ 

  const pipeline = asyncCompose(addCommentConverter,asyncCompose(addComment, addCommentDTO));

  try{
    const result = await pipeline(formData);
    return {
      success:true,
      comment:result
    }
  }
  catch(err){
    const error = err as { cause:string, message:string };
    //console.log(error.cause);
    return {
      success:false,
      error: error.message
    }
  }
}

async function addCommentDTO(formData:FormData){
  const Zod_CommentValidationSchema = z.object({
    comment: z.string().min(1,{message: "留言內容不能為空"}).max(40,{message:"請輸入40字內"}),
    type: z.string().refine(val => isValidHobby(val)),
    docId: z.string().min(1)
  });
  
  const validation = Zod_CommentValidationSchema.safeParse(Object.fromEntries(formData));
  
  if(!validation.success){
    const fieldError = validation.error.flatten().fieldErrors;
    if(fieldError.comment){
      throw Error(fieldError.comment.shift(),{ cause:"dto" });
    }
    throw Error("提交錯誤，請重新整理頁面",{ cause:"dto" });
  }
  return validation.data;
}

async function addCommentConverter(apiOutput:Awaited<ReturnType<typeof addComment>>){

  const errMsg = (short:string) => {
    switch (short){
      case "access_token_invalid":   return '用戶驗證失敗，請重新登入';
      case "access_token_not_found": return '用戶驗證失敗，請重新登入';
      case "invaild_api_call":       return '提交錯誤，請重新整理頁面';
      case "comments_over_limit":    return '留言已到上限，每編文章現時只可供5個留言';
      default:                       return '系統錯誤';
    }
  }
  if(isErrorResponse(apiOutput)){
    throw Error(errMsg(apiOutput.error.short), { cause: 'api' });
  }
  return apiOutput.result;
}

type SubmitResult = {
  success:true;
  comment:API_Comments
} | {
  success:false;
  error:string;
}