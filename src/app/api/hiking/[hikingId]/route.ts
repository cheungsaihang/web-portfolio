import { type NextRequest, NextResponse } from "next/server"
import { API_hikingDetailSchema } from "@/types/api/hiking";
import { prepareGetDoc } from "@/modules/server/api";
import { handleHikingDetail } from "@/modules/server/api/handlers/hiking";

type Params = {
  hikingId: string
}
export async function GET(request: NextRequest, context: { params: Promise<Params> } ) {
  const { hikingId } = await context.params;
  const getDocFn = prepareGetDoc('hiking',hikingId);
  const result = await getDocFn();
  if(result){
    const data = await handleHikingDetail(result);  
    const res = (data && API_hikingDetailSchema.safeParse(data).success) ? data : null;
    return NextResponse.json(res);
  }
  return NextResponse.json(null);
}

//Dynamic segment - Default is SSR. Todo: Setup Generating Static Params function to change to ISR.