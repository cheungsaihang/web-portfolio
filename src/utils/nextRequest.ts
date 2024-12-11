import { NextRequest } from "next/server";
import { isStringNumber } from "./common";
import { SearchParams } from "@/types";

export function getAllParams(request:NextRequest){
  const searchParams = request.nextUrl.searchParams;
  return (...rest:string[]) => rest.map((key) => searchParams.get(key))
}

export function getKeyParam(searchParams:SearchParams, key:string):string | null{
  if(!searchParams || !searchParams[key]){
    return null;
  }
  if(Array.isArray(searchParams[key])){
    const last = searchParams[key].length -1;
    return searchParams[key][last];
  }
  return searchParams[key];
}

export function getRequestPageNumber(page:string | null):number{
  if(isStringNumber(page)){
    const _page = parseInt(page);
    //Reasonable page
    if(_page > 0 && _page <=20){
      return _page
    }
  }
  return 1;
}