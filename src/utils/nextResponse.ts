import { NextResponse } from "next/server";
import { API_Error, API_Error_Body, API_Success } from "@/types/api";

type ResponseBody = object | string;

export function ApiResponse(
  code:number,
  body:ResponseBody,
):NextResponse<API_Success<ResponseBody> | API_Error>{
  if(isErrorResponseCode(code)){
    if(!isValidErrorResponse(body)){
      throw Error("Error response object should has string 'short' and 'message' keys with string format");
    }
    //Error Response
    return NextResponse.json({ code:code, error:body },{status:code});
  }
  //Success Response
  return NextResponse.json({ code:code, result:body },{status:code});
}

export function isErrorResponse(result: API_Success<ResponseBody> | API_Error): result is API_Error {
  if(isErrorResponseCode(result.code)){
    return true;
  }
  return false;
}

function isErrorResponseCode(code:number){
  return ![200,201,202,203,204].includes(code);
}

function isValidErrorResponse(body:ResponseBody):body is API_Error_Body{
  if(typeof body !== 'object' || !('short' in body) || !('message' in body)){
    return false;
  }
  if(typeof body.short !== 'string' || typeof body.message !== 'string'){
    return false;
  }
  return true;
}