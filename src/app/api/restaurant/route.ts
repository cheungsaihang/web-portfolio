import { NextRequest } from "next/server";
import { Zod_API_restaurantListSchema, API_RestaurantList } from "@/types/api/restaurant";
import { db, FS_QueryCondition, storage } from "@/modules/server/firebase";
import { getAllParams, getRequestPageNumber } from "@/utils/nextRequest";
import { PAGINATION_LIMIT } from "@/constants";
import { QueryResponse } from "@/modules/server/firebase/services/db";
import { FS_RestaurantSchema } from "@/modules/server/firebase/schemas/restaurant.schema";
import { ApiResponse } from "@/utils/nextResponse";
import { API_Success } from "@/types/api";

const collectionId = 'restaurant';

export async function GET(request:NextRequest) {
  //Handle request params
  const tags = await getTags();
  const [searchTags, page] = getAllParams(request)('tags','page');

  //Prepare Database query
  const _page = getRequestPageNumber(page);
  const _limit = PAGINATION_LIMIT + 1;
  const condition: FS_QueryCondition = {
    where: (searchTags && tags.indexOf(searchTags) > 0) ? [{ condition:'array-contains', field:'tags', keyword:searchTags }] : undefined,
    page: _page,
    order: ['order'],
    length: _limit
  }
  
  //Invoke
  const result = await db.queryDocs(collectionId, condition)();
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
  const body = await res.json() as API_Success<string[]>;
  const data =  body.result;
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
                : await storage.getImage({
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