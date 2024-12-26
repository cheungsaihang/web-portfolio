import { API_URL } from "@/constants/api";
import { API_Error, API_ListResponse, API_Success } from "@/types/api";
import { API_RestaurantList } from "@/types/api/restaurant";
import { isErrorResponse } from "@/utils/nextResponse";
import { isServer } from "@/utils/common";
import RestaurantList from "./restaurantList";

export default async function Content({tagId,tags}:{tagId:number; tags:string[];}) {
  const apiUrl = API_URL.restaurant + `${tagId ? `?tags=${tags[tagId]}` : '' }`;
  const initList = await getInitalList(apiUrl);
  return ( <RestaurantList initList={initList} apiUrl={apiUrl} /> );
}

async function getInitalList(path:string){
  try{
    const apiUrl = isServer() ? process.env.API_ENDPOINT + path : path;
    const res = await fetch(apiUrl);
    const body = await res.json() as API_Success<API_ListResponse<API_RestaurantList>> | API_Error;
    if(!isErrorResponse(body)){
      return {
        list:body.result.records,
        isMorePage:body.result.pagination.isMorePage
      }
    }
  }
  catch(err){
    console.log('Restaurant List - getInitalList',err);
  }
  return {
    list:null,
    isMorePage:false
  }
}