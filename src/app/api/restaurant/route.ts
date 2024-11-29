import { NextResponse } from "next/server";
import { API_restaurantListSchema } from "@/types/api/restaurant";
import { prepareQuery } from "@/modules/server/api";
import { handleRestaurantList } from "@/modules/server/api/handlers/restaurant";

export async function GET() {
  const queryFn = prepareQuery('restaurant');
  const result = await queryFn();
  if(result){
    const data = await handleRestaurantList(result);
    const res = data ? data.filter(doc => API_restaurantListSchema.safeParse(doc).success) : null;
    return NextResponse.json(res);
  }
  return NextResponse.json(null);
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;