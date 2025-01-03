import { ApiResponse } from "@/utils/nextResponse";
import { fetchHomeArticle } from "@/libs/firebase/homeApi";

export async function GET() {
  const res = await fetchHomeArticle();
  if(!res){
    return ApiResponse(404,{short:'home_article_not_found', message: 'Cannot find home page article'});
  }
  return ApiResponse(200,res);
}