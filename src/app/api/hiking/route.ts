import { NextResponse } from "next/server";
import { getHikingList } from "./services";
import { API_hikingListSchema } from "@/types/api/hiking.d";

export async function GET() {
  const data = await getHikingList();
  const res = data ? data.filter(doc => API_hikingListSchema.safeParse(doc).success) : null;
  return NextResponse.json(res);
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;