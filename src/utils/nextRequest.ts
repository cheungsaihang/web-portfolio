import { NextRequest } from "next/server";

export function getAllParams(request:NextRequest){
  const searchParams = request.nextUrl.searchParams;
  return (...rest:string[]) => rest.map((key) => searchParams.get(key))
}