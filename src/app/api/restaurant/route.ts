import { NextResponse } from "next/server";
import { getRestaurantList } from "./services";
import { API_restaurantListSchema } from "@/types/api/restaurant.d";

export async function GET() {
  const data = await getRestaurantList();
  const res = data ? data.filter(doc => API_restaurantListSchema.safeParse(doc).success) : null;
  return NextResponse.json(res);
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;