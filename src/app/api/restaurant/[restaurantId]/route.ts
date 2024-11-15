import { type NextRequest, NextResponse } from "next/server"
import { getRestaurantDetail } from "../services";
import { API_restaurantDetailSchema } from "@/types/api/restaurant.d";

type Params = {
  restaurantId: string
}
export async function GET(request: NextRequest, context: { params: Params } ) {
  const data = await getRestaurantDetail(context.params.restaurantId);

API_restaurantDetailSchema.parse(data);
  const res = (data && API_restaurantDetailSchema.safeParse(data).success) ? data : null;
  return NextResponse.json(res);
}
