import { type NextRequest, NextResponse } from "next/server"
import { getRestaurantDetail } from "../services";
import { API_restaurantDetailSchema } from "@/types/api/restaurant";

type Params = {
  restaurantId: string
}
export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { restaurantId } = await context.params;
  const data = await getRestaurantDetail(restaurantId);
  const res = (data && API_restaurantDetailSchema.safeParse(data).success) ? data : null;
  return NextResponse.json(res);
}
//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.