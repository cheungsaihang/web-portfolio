import { type NextRequest, NextResponse } from "next/server"
import { API_restaurantDetailSchema } from "@/types/api/restaurant";
import { prepareGetDoc } from "@/modules/server/api";
import { handleRestaurantDetail } from "@/modules/server/api/handlers/restaurant";

type Params = {
  restaurantId: string
}
export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { restaurantId } = await context.params;
  const getDocFn = prepareGetDoc('restaurant',restaurantId);
  const result = await getDocFn();
  if(result){
    const data = await handleRestaurantDetail(result);  
    const res = (data && API_restaurantDetailSchema.safeParse(data).success) ? data : null;
    return NextResponse.json(res);
  }
  return NextResponse.json(null);
}
//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.