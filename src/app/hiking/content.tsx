"use server"
import { API_URL } from "@/constants/api";
import { API_Error, API_ListResponse, API_Success } from "@/types/api";
import { API_HikingList } from "@/types/api/hiking";
import { isErrorResponse } from "@/utils/nextResponse";
import { isServer } from "@/utils/common";
import HikingList from "./hikingList";

export default async function Content({searchParam}:{searchParam:string | null;}) {
  const apiUrl = API_URL.hiking + `${searchParam ? `?tags=${searchParam}` : '' }`;
  const initList = await getInitalList(apiUrl);
  return ( <HikingList initList={initList} apiUrl={apiUrl} /> );
}

async function getInitalList(path:string){
  try{
    const apiUrl = isServer() ? process.env.API_ENDPOINT + path : path;
    const res = await fetch(apiUrl);
    const body = await res.json() as API_Success<API_ListResponse<API_HikingList>> | API_Error;
    if(!isErrorResponse(body)){
      return {
        list:body.result.records,
        isMorePage:body.result.pagination.isMorePage
      }
    }
  }
  catch(err){
    console.log('Hiking List - getInitalList',err);
  }
  return {
    list:null,
    isMorePage:false
  }
}