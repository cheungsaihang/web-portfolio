import { NextRequest } from "next/server";
import { Zod_API_hikingListSchema, API_HikingList } from "@/types/api/hiking";
import { prepareQuery, prepareGetImageUrl } from "@/modules/server/firebase";
import { QueryResponse } from "@/modules/server/firebase/services/db";
import { getAllParams, getRequestPageNumber } from "@/utils/nextRequest";
import { PAGINATION_LIMIT } from "@/constants";
import { FS_HikingSchema } from "@/modules/server/firebase/schemas/hiking.schema";
import { ApiResponse } from "@/utils/nextResponse";
import { API_Success } from "@/types/api";

const collectionId = 'hiking';
const downloadImageFn = prepareGetImageUrl();

export async function GET(request:NextRequest) {
  //Get Tags
  const tags = await getTags();
  //Handle request params
  const [searchTags, page] = getAllParams(request)('tags','page');
  const _limit = PAGINATION_LIMIT + 1;
  const _page = getRequestPageNumber(page);
  const _search = ( searchTags && tags.indexOf(searchTags) > 0 ) ? { tags:searchTags } : undefined;
  //Prepare Database query
  const queryFn = prepareQuery(collectionId,{
    search:_search,
    page:_page,
    order: ['order'], 
    limit: _limit
  });
  //Invoke
  const result = await queryFn();
  if(!result){
    return ApiResponse(200,{
      tags:tags,
      records:null,
      pagination:{
        currentPage:_page,
        isMorePage:false
      }
    });
  }
  //Download Images and convert result
  const records = await convertResult(result);
  const isMorePage = records.length >= _limit || false;
  return ApiResponse(200,{
    tags:tags,
    records: isMorePage ? records.slice(0,-1) : records,
    pagination:{
      currentPage:_page,
      isMorePage:isMorePage
    }
  });
}

async function convertResult(res:QueryResponse){
  const list =  await Promise.all(res.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_HikingSchema;
    const pic = !data?.pics 
                 ? undefined
                 : await downloadImageFn({
                    docType:collectionId,
                    docId:id,
                    docPic:data.pics[0]
                  });
    return {
      id:id,
      name:data?.name,
      pic:pic
    }
  }));
  return list.filter(doc => Zod_API_hikingListSchema.safeParse(doc).success) as API_HikingList[];
}

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/hiking',{ cache: 'no-store' });
  const body = await res.json() as API_Success<string[]>;
  const data =  body.result;
  const tags = ['全部',...data];
  return tags;
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 