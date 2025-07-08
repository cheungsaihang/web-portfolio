import { NextRequest } from "next/server";
import { Zod_API_hikingListSchema, API_HikingList } from "@/types/api/hiking";
import { db, FS_QueryCondition, storage } from "@/modules/server/firebase";
import { QueryResponse } from "@/modules/server/firebase/services/db";
import { getAllParams, getRequestPageNumber } from "@/utils/nextRequest";
import { PAGINATION_LIMIT } from "@/constants";
import { FS_HikingSchema } from "@/modules/server/firebase/schemas/hiking.schema";
import { ApiResponse } from "@/utils/nextResponse";
import { fetchTags } from "@/libs/firebase/tagsApi";

const collectionId = 'hiking';

export async function GET(request:NextRequest) {
  //Handle request params
  const tags = await fetchTags(collectionId);
  const [searchTags, page] = getAllParams(request)('tags','page');

  //Prepare Database query
  const _page = getRequestPageNumber(page);
  const _limit = PAGINATION_LIMIT + 1;
  const condition: FS_QueryCondition = {
    where: ( searchTags && tags && tags.indexOf(searchTags) > 0 ) ? [{ condition:'array-contains', field:'tags', keyword:searchTags }] : undefined,
    page: _page,
    order: ['order'],
    length: _limit
  }
  
  //Invoke
  const result = await db.queryDocs(collectionId,condition)();
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
                 : await storage.getImage({
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