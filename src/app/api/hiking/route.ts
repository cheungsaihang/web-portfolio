import { NextResponse } from "next/server";
import { API_hikingListSchema } from "@/types/api/hiking";
import { prepareQuery } from "@/modules/server/api";
import { handleHikingList } from "@/modules/server/api/handlers/hiking";

export async function GET() {
  const queryFn = prepareQuery('hiking');
  const result = await queryFn();
  if(result){
    const data = await handleHikingList(result);
    const res = data ? data.filter(doc => API_hikingListSchema.safeParse(doc).success) : null;
    return NextResponse.json(res);
  }
  return NextResponse.json(null);
}

//Static Segment - with revalidate option is ISR. The revalidation frequency is 900 sec 
export const revalidate = 900;