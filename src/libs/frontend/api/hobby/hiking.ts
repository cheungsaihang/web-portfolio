import { API_ListResponse, API_Response } from "@/types/api";
import { API_HikingDetail, API_HikingList } from "@/types/api/hiking";
import { isErrorResponse } from "@/utils/nextResponse";
import { API_URL } from "@/constants/api";
import { isServer } from "@/utils/common";

const apiUrl = `${isServer() ? process.env.API_ENDPOINT : ''}${API_URL.hiking}`;

export async function listHikings(query:string){
  const res = await fetch(apiUrl + query);
  const body = await res.json() as API_Response<API_ListResponse<API_HikingList>>;
  if(isErrorResponse(body)){
    return {
      list:null,
      isMorePage:false
    }
  }
  return {
    list:body.result.records,
    isMorePage:body.result.pagination.isMorePage
  }
}

export async function getHiking(docId:string){
  const res = await fetch(apiUrl + '/' + docId,{ cache: 'no-store' });
  const body = await res.json() as API_Response<API_HikingDetail>;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}
