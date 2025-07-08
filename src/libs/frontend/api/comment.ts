import { Hobby } from "@/types";
import { API_Response } from "@/types/api";
import { API_CommentListResponse, API_Comments } from "@/types/api/comments";
import { isServer } from "@/utils/common";
import { isErrorResponse } from "@/utils/nextResponse";
import { sessionCookies } from "@/utils/cookies";


const apiUrl = `${isServer() && process.env.API_ENDPOINT}/api/comments`;

export async function listComments({
  type,
  docId
}:{
  type:Hobby;
  docId:string;
}){
  const res = await fetch(apiUrl + `?type=${type}&id=${docId}`,{
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    cache: 'no-store' 
  });
  const body = await res.json() as API_Response<API_CommentListResponse>;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}

export async function addComment(body:{
  type:Hobby;
  docId:string;
  comment:string;
}){
  const [accessToken] = (await sessionCookies()).get();
  
  const res = await fetch(`${process.env.API_ENDPOINT}/api/comments`,{
    method: 'POST',
    body: JSON.stringify(body),
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    },
    cache: 'no-store' 
  });

  return await res.json() as API_Response<API_Comments>;
}

export async function deleteComment(commentId:string){
  const [accessToken] = (await sessionCookies()).get();
  
  const res = await fetch(`${process.env.API_ENDPOINT}/api/comments/${commentId}`,{
    method: 'DELETE',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    },
    cache: 'no-store' 
  });
  return await res.json() as API_Response<string>;
}