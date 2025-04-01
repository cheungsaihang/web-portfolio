import { type NextRequest } from "next/server"
import { ApiResponse } from "@/utils/nextResponse";
import { fetchTags } from "@/libs/firebase/tagsApi";

type Params = {
  collectionId: 'hiking' | 'restaurant';
}
//Return a list of `params` to populate the [collectionId] dynamic segment
export async function generateStaticParams() {
  return [
    {
      collectionId:'hiking'
    },
    {
      collectionId:'restaurant'
    }
  ];
}

export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { collectionId } = await context.params;
  if(collectionId == 'hiking' || collectionId == 'restaurant'){
    const tags = await fetchTags(collectionId);
    if(tags){
      return ApiResponse(200,tags);
    }
  }
  return ApiResponse(404,{short:'tags_not_found',message:'Cannot found tags'});
}

//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.
export const revalidate = 900;