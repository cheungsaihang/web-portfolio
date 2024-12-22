import { type NextRequest } from "next/server"
import { Zod_API_hikingDetailSchema } from "@/types/api/hiking";
import { prepareGetDoc, prepareGetImageUrl } from "@/modules/server/firebase";
import { DocResponse } from "@/modules/server/firebase/services/db";
import { FS_HikingSchema } from "@/modules/server/firebase/schemas/hiking.schema";
import { ApiResponse } from "@/utils/nextResponse";

type Params = {
  hikingId: string
}
const collectionId = 'hiking';
const downloadImageFn = prepareGetImageUrl();

export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { hikingId } = await context.params;
  const getDocFn = prepareGetDoc(collectionId,hikingId);
  const result = await getDocFn();
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
               : await Promise.all(data.pics.map(async (pic) =>  await downloadImageFn({
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
    pics:pics
  }
}

//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.