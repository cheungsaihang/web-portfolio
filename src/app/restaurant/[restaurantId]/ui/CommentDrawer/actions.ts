"use server"
import { z } from "zod";
import { isErrorResponse } from "@/utils/nextResponse";
import { addComment } from "@/services/commentService";
import { isValidHobby } from "@/services/hobbyService";
import { API_Comments } from "@/types/api/comments";
import submitActionPipe from "@/pipes/submitAction.pipe";

export default async function submitAddComment(prevState:unknown, formData:FormData):Promise<SubmitResult>{ 
  try{
    const result = await submitActionPipe(formData,{
      dto:dto,
      api:addComment,
      callback:callback
    });
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

function dto(formData:FormData){

  const Zod_CommentValidationSchema = z.object({
    comment: z.string().min(1,{message: "留言內容不能為空"}).max(20,{message:"請輸入20字內"}),
    type: z.string().min(1),
    docId: z.string().min(1)
  });
  
  const validation = Zod_CommentValidationSchema.safeParse(Object.fromEntries(formData));
  
  if(!validation.success){
    const fieldError = validation.error.flatten().fieldErrors;
    if(fieldError.comment){
      throw Error(fieldError.comment.shift(),{ cause:"dto" });
    }
    else{
      throw Error("提交錯誤，請重新整理頁面",{ cause:"dto" });
    }
  }
  const { type } = validation.data;

  if(!isValidHobby(type)){
    throw Error("提交錯誤，請重新整理頁面",{ cause:'dto' });
  }
  return {
    ...validation.data,
    type
  }
}

function callback(apiOutput:Awaited<ReturnType<typeof addComment>>){
  if(isErrorResponse(apiOutput)){
    switch (apiOutput.error.short){
      case "access_token_invalid":
        throw Error('用戶驗證失敗，請重新登入',{cause: 'api'});
      case "access_token_not_found":
        throw Error('用戶驗證失敗，請重新登入',{ cause: 'api'});
      case "invaild_api_call":
        throw Error('提交錯誤，請重新整理頁面',{ cause: 'api'});
      case "comments_over_limit":
        throw Error('留言已到上限，每編文章現時只可供5個留言',{ cause: 'api'});
      default:
        throw Error('系統錯誤',{ cause: 'api'});
    }
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