import { API_ListResponse, API_Response } from "@/types/api";
import { API_RestaurantDetail, API_RestaurantList } from "@/types/api/restaurant";
import { isErrorResponse } from "@/utils/nextResponse";
import { isServer } from "@/utils/common";
import { API_URL } from "@/constants/api";

const apiUrl = `${isServer() ? process.env.API_ENDPOINT : ''}${API_URL.restaurant}`;

export async function listRestaurants(query:string){
  const res = await fetch(apiUrl + query);
  const body = await res.json() as API_Response<API_ListResponse<API_RestaurantList>>;
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

export async function getRestaurant(docId:string){
  const res = await fetch(apiUrl + '/' + docId, { cache: 'no-store' });
  const body = await res.json() as API_Response<API_RestaurantDetail>;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}