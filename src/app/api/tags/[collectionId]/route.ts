import { type NextRequest, NextResponse } from "next/server"
import { CollectionType, prepareGetDoc, isValidCollection } from "@/modules/server/api";

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
        return NextResponse.json(data.tags);
      }
    }
  }
  return NextResponse.json(null);
}

//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.