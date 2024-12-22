import { prepareGetDoc } from "@/modules/server/firebase";
import { FS_Article_Home } from "@/types/api/home";
import { ApiResponse } from "@/utils/nextResponse";

async function getHomeArticle(){
  // Fetch data from firestore
  const getDocFn = prepareGetDoc('article','home');
  const doc = await getDocFn();
  if(!doc){
    return null;
  }
  
  const id = doc.id;
  const data = doc.data() as FS_Article_Home;
  return {
    id:id,
    ...data
  }
}

export async function GET() {
  const res = await getHomeArticle();
  if(!res){
    return ApiResponse(404,{short:'home_article_not_found', message: 'Cannot find home page article'});

  }
  return ApiResponse(200,res);
}

//Static segment - default is SSG