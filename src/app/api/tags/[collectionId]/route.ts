import { type NextRequest } from "next/server"
import { prepareGetDoc } from "@/modules/server/firebase";
import { CollectionType, isValidCollection } from "@/modules/server/firebase/util";
import { ApiResponse } from "@/utils/nextResponse";

type Params = {
  collectionId: CollectionType
}
export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { collectionId } = await context.params;
  if(isValidCollection(collectionId)){
    const getDocFn = prepareGetDoc('tags',collectionId);
    const doc = await getDocFn();
    if(doc){
      const data = doc.data() as { tags:string[] };
      if(data?.tags && data.tags.length){
        return ApiResponse(200,data.tags);
      }
    }
  }
  return ApiResponse(404,{short:'tags_not_found',message:'Cannot found tags'});
}

//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.
export const revalidate = 900;