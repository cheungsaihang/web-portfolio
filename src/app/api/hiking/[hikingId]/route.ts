import { type NextRequest, NextResponse } from "next/server"
import { getHikingDetail } from "../services";
import { API_hikingDetailSchema } from "@/types/api/hiking.d";

type Params = {
  hikingId: string
}
export async function GET(request: NextRequest, context: { params: Params } ) {
  const data = await getHikingDetail(context.params.hikingId);
  const res = (data && API_hikingDetailSchema.safeParse(data).success) ? data : null;
  return NextResponse.json(res);
}
