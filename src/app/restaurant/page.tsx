import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import { getKeyParam } from "@/utils/nextRequest";
import { SearchParams } from "@/types";
import { redirect } from "next/navigation";
import { listTags } from "@/libs/frontend/api/tags";
import Layout from "@/modules/client/_app/restaurant/list/layout";
import Main from "@/modules/client/_app/restaurant/list/main";

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 餐廳`,
  description: "分享日式，韓式，泰式等多種唔同餐廳食評及用餐體驗。",
}

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const tags = await listTags('restaurant');
  const [query, tagId] = await searchParamsPipe({ tags, searchParams });
  if(tagId < 0){
    redirect('/restaurant');
    return null;
  }
  return ( 
    <Layout tags={tags} tagId={tagId}>
      <Main query={query} />
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