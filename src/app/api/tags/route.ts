import { ApiResponse } from "@/utils/nextResponse";
export async function GET() {
  return ApiResponse(404,{short:'tags_not_found',message:'Cannot found tags'});
}
export const dynamic = 'force-static';