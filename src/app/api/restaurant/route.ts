import { NextRequest, NextResponse } from "next/server";
import { API_restaurantListSchema, API_RestaurantList } from "@/types/api/restaurant";
import { prepareQuery } from "@/modules/server/api";
import { handleRestaurantList } from "@/modules/server/api/handlers/restaurant";
import { getAllParams } from "@/utils/nextRequest";

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/restaurant',{ cache: 'no-store' });
  const data = await res.json() as string[];
  const tags = ['全部',...data];
  return tags;
}

type Response = {
  tags:string[];
  records:API_RestaurantList[] | null;
};

export async function GET(request:NextRequest) {
  const tags = await getTags();
  const response:Response = { tags: tags, records: null };

  const [searchTags] = getAllParams(request)('tags');
  const queryFn = searchTags && tags.indexOf(searchTags) > 0 
                  ? prepareQuery('restaurant',{tags:searchTags}) 
                  : prepareQuery('restaurant');

  const result = await queryFn();
  if(result){
    const data = await handleRestaurantList(result);
    const res = data && data.filter(doc => API_restaurantListSchema.safeParse(doc).success);
    response.records = res ? res as API_RestaurantList[] : null;
  }
  return NextResponse.json(response);
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;