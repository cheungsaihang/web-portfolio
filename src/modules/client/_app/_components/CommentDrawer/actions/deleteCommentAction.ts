"use server"
import { isErrorResponse } from "@/utils/nextResponse";
import { deleteComment } from "@/libs/frontend/api/comment";

export async function deleteCommentAction(prevState:unknown, commentId:string){
  try{
    const apiOutput = await deleteComment(commentId);
    
    if(isErrorResponse(apiOutput)){
      throw Error("提交錯誤，請重新整理頁面",{ cause:"api" });
    }
    else{
      return {
        success:true,
        commentId:commentId
      }
    }
  }
  catch(err){
    const error = err as { cause:string, message:string };
    return {
      success:false,
      error: error.message
    }
  }
}