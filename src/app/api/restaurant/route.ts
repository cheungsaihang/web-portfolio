import { NextRequest } from "next/server";
import { Zod_API_restaurantListSchema, API_RestaurantList } from "@/types/api/restaurant";
import { prepareQuery, prepareGetImageUrl} from "@/modules/server/firebase";
import { getAllParams, getRequestPageNumber } from "@/utils/nextRequest";
import { PAGINATION_LIMIT } from "@/constants";
import { QueryResponse } from "@/modules/server/firebase/services/db";
import { FS_RestaurantSchema } from "@/modules/server/firebase/schemas/restaurant.schema";
import { ApiResponse } from "@/utils/nextResponse";

const collectionId = 'restaurant';
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

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/restaurant',{ cache: 'no-store' });
  const data = await res.json() as string[];
  const tags = ['全部',...data];
  return tags;
}

async function convertResult(res:QueryResponse){
  const list =  await Promise.all(res.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_RestaurantSchema;
    const firstPicture = data?.reviews[0]?.pic;
    const pic = !firstPicture
                ? undefined
                : await downloadImageFn({
                    docType:collectionId,
                    docId:id,
                    docPic:firstPicture
                  });
    return {
      id:id,
      name:data?.name,
      pic:pic
    }
  }));
  return list.filter(doc => Zod_API_restaurantListSchema.safeParse(doc).success) as API_RestaurantList[];
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;