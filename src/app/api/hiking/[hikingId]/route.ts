import { type NextRequest } from "next/server"
import { Zod_API_hikingDetailSchema } from "@/types/api/hiking";
import { db, storage } from "@/modules/server/firebase";
import { DocResponse } from "@/modules/server/firebase/services/db";
import { FS_HikingSchema } from "@/modules/server/firebase/schemas/hiking.schema";
import { ApiResponse } from "@/utils/nextResponse";

type Params = {
  hikingId: string
}
const collectionId = 'hiking';

export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { hikingId } = await context.params;
  const result = await db.getDoc(collectionId,hikingId)();
  if(result){
    const res = await convertResult(result);
    if(Zod_API_hikingDetailSchema.safeParse(res).success){
      return ApiResponse(200,res);
    }
  }
  return ApiResponse(404,{short:"page_not_found",message:"Page not Found"});
}

async function convertResult(doc:DocResponse){
  const id = doc.id;
  const data = doc.data() as FS_HikingSchema;
  const pics = !data?.pics 
               ? undefined
               : await Promise.all(data.pics.map(async (pic) =>  await storage.getImage({
                docType:collectionId,
                docId:id,
                docPic:pic
              })));

  return {
    id:id,
    name:data?.name,
    reviews:data?.reviews,
    map:data?.map,
    difficult: data?.difficult,
    tags:data?.tags,
    order:data?.order,
    pics:pics
  }
}

//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.