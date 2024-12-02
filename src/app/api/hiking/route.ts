import { NextRequest, NextResponse } from "next/server";
import { API_hikingListSchema, API_HikingList } from "@/types/api/hiking";
import { prepareQuery } from "@/modules/server/api";
import { handleHikingList } from "@/modules/server/api/handlers/hiking";
import { getAllParams } from "@/utils/nextRequest";

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/hiking',{ cache: 'no-store' });
  const data = await res.json() as string[];
  const tags = ['全部',...data];
  return tags;
}

type Response = {
  tags:string[];
  records:API_HikingList[] | null;
};

export async function GET(request:NextRequest) {
  const tags = await getTags();
  const response:Response = { tags: tags, records: null };

  const [searchTags] = getAllParams(request)('tags');
  const queryFn = searchTags && tags.indexOf(searchTags) > 0 
                  ? prepareQuery('hiking',{tags:searchTags}) 
                  : prepareQuery('hiking');

  const result = await queryFn();
  if(result){
    const data = await handleHikingList(result);
    const res = data && data.filter(doc => API_hikingListSchema.safeParse(doc).success);
    response.records = res ? res as API_HikingList[] : null;
  }
  return NextResponse.json(response);
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;