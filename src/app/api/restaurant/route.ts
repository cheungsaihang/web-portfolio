import { NextRequest, NextResponse } from "next/server";
import { API_restaurantListSchema, API_RestaurantList } from "@/types/api/restaurant";
import { prepareQuery, QueryCondition } from "@/modules/server/api";
import { handleRestaurantList } from "@/modules/server/api/handlers/restaurant";
import { getAllParams, getRequestPageNumber } from "@/utils/nextRequest";
import { PAGINATION_LIMIT } from "@/constants";
import { API_ListResponse } from "@/types/api";

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/restaurant',{ cache: 'no-store' });
  const data = await res.json() as string[];
  const tags = ['全部',...data];
  return tags;
}

export async function GET(request:NextRequest) {
  const tags = await getTags();
  const [searchTags, page] = getAllParams(request)('tags','page');
  //Default condition order by and limit
  const _limit = PAGINATION_LIMIT + 1;
  const condition:QueryCondition = { order: ['order'], limit: _limit};
  condition.page = getRequestPageNumber(page);
  condition.search = ( searchTags && tags.indexOf(searchTags) > 0 ) ? { tags:searchTags } : undefined;

  const response:API_ListResponse<API_RestaurantList> = { tags: tags, records: null, pagination: { currentPage: condition.page, isMorePage: false } };

  //Invoke
  const queryFn = prepareQuery('restaurant',condition);
  const result = await queryFn();
  if(result){
    const data = await handleRestaurantList(result);
    const res = data && data.filter(doc => API_restaurantListSchema.safeParse(doc).success);
    const records = res ? res as API_RestaurantList[] : null;
    if(records && records.length >= _limit){
      response.records = records.slice(0,-1);
      response.pagination.isMorePage = true;
    }
    else{
      response.records = records;
    }
  }
  return NextResponse.json(response);
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;