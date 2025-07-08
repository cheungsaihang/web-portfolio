import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import { getKeyParam } from "@/utils/nextRequest";
import { SearchParams } from "@/types";
import { redirect } from "next/navigation";
import { listTags } from "@/libs/frontend/api/tags";
import Layout from "@/modules/client/_app/hiking/list/layout";
import Main from "@/modules/client/_app/hiking/list/main";

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 行山`,
  description: "分享魔鬼山,龍脊,釣魚翁,獅子山及更多行山徑的前往方法及感受。",
};

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const tags = await listTags('hiking');
  const [query, tagId] = await searchParamsPipe({ tags, searchParams });
  if(tagId < 0){
    redirect('/hiking');
    return null;
  }
  return ( 
    <Layout tags={tags} tagId={tagId}>
      <Main query={query}/>
    </Layout>
  );
}

async function searchParamsPipe({
  tags,
  searchParams
}:{
  tags:string[];
  searchParams:Promise<SearchParams>;
}){
  const searchTag = getKeyParam((await searchParams),'tags');
  const query = searchTag ? `?tags=${searchTag}` : '';
  const currentTagId = searchTag ? tags.indexOf(searchTag) : 0;
  return [query, currentTagId] as const;
}