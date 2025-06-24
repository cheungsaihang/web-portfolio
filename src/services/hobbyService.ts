import { Hobby } from "@/types";
import { API_Error, API_Success } from "@/types/api";
import { API_HikingDetail } from "@/types/api/hiking";
import { API_RestaurantDetail } from "@/types/api/restaurant";
import { isErrorResponse } from "@/utils/nextResponse";

export function isValidHobby(hobby:string):hobby is Hobby{
  return hobby == "restaurant" || hobby == "hiking";
}

export async function getHobbyDetail(hobby:Hobby,docId:string){
  const res = await fetch(`${process.env.API_ENDPOINT}/api/${hobby}/${docId}`, { cache: 'no-store' });
  const body = await res.json() as API_Error | API_Success<API_RestaurantDetail | API_HikingDetail>;
  if(isErrorResponse(body)){
    return null;
  }
  const data = body;
  return data.result;
}