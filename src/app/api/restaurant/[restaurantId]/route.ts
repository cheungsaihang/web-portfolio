import { type NextRequest } from "next/server"
import { Zod_API_restaurantDetailSchema } from "@/types/api/restaurant";
import { db, storage } from "@/modules/server/firebase";
import { DocResponse } from "@/modules/server/firebase/services/db";
import { ApiResponse } from "@/utils/nextResponse";
import { FS_RestaurantSchema } from "@/modules/server/firebase/schemas/restaurant.schema";

type Params = {
  restaurantId: string
}
const collectionId = 'restaurant';

export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { restaurantId } = await context.params;
  const result = await db.getDoc(collectionId,restaurantId)();
  console.log("result",result?.id);
  if(result){
    const res = await convertResult(result);
    if(Zod_API_restaurantDetailSchema.safeParse(res).success){
      return ApiResponse(200,res);
    }    
  }
  return ApiResponse(404,{short:"page_not_found",message:"Page not Found"});
}

async function convertResult(doc:DocResponse){
  const id = doc.id;
  const data = doc.data() as FS_RestaurantSchema;
  const reviews = await Promise.all(data.reviews.map(async (item) => ({
    review: item.review,
    pic: item?.pic ? await storage.getImage({docType:collectionId,docId:id,docPic:item.pic}) : undefined,
    order: item.order,
  })));
  //Reviews ordering
  reviews.sort(function(a, b) {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });

  return {
    id:id,
    name:data?.name,
    reviews: reviews,
    location: data?.location,
    rate: data?.rate,
    tags: data?.tags,
    order: data?.order
  }
}
