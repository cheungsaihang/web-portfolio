import { type NextRequest, NextResponse } from "next/server"
import { getHikingDetail } from "../services";
import { API_hikingDetailSchema } from "@/types/api/hiking";

type Params = {
  hikingId: string
}
export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { hikingId } = await context.params;
  const data = await getHikingDetail(hikingId);
  const res = (data && API_hikingDetailSchema.safeParse(data).success) ? data : null;
  return NextResponse.json(res);
}

//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.