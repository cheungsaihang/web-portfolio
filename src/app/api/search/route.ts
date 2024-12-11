import { NextRequest, NextResponse } from "next/server";
import { prepareQuery, isValidCollection } from "@/modules/server/api/";
import { handleRestaurantList } from "@/modules/server/api/handlers/restaurant";
import { handleHikingList } from "@/modules/server/api/handlers/hiking";

export async function GET(request:NextRequest) {
  const [collectionId, tags] = getAllParams(request)('cid','tags');

  if(collectionId && isValidCollection(collectionId)){
    const queryfn = prepareQuery(collectionId, { search: { tags:tags } });
    const result = await queryfn();
    if(result){
      const handler = collectionId == 'restaurant' ? handleRestaurantList : handleHikingList;
      const response = await handler(result);
      return NextResponse.json(response);
    }
  }
  return NextResponse.json(null);
}

function getAllParams(request:NextRequest){
  const searchParams = request.nextUrl.searchParams;
  return (...rest:string[]) => rest.map((key) => searchParams.get(key))
}