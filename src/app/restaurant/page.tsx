import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import { API_Error, API_Success } from "@/types/api";
import { isErrorResponse } from "@/utils/nextResponse";
import dynamic from "next/dynamic";
import { SkeletionContent } from "./loading";
import { getKeyParam } from "@/utils/nextRequest";
import { SearchParams } from "@/types";
import { redirect } from "next/navigation";
import Wrapper from "./wrapper";

const Content = dynamic(() => import('./content'),{
  loading: () => <SkeletionContent />,
})

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/restaurant',{ cache: 'no-store' });
  const body = await res.json() as API_Success<string[]> | API_Error;
  const tags = isErrorResponse(body) ? ['全部'] : ['全部',...body.result];
  return tags;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 餐廳`,
  description: "分享日式，韓式，泰式等多種唔同餐廳食評及用餐體驗。",
}

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const tags = await getTags();
  const searchTag = getKeyParam((await searchParams),'tags');
  const currentTagId = searchTag && tags.indexOf(searchTag) || 0;
  if(currentTagId < 0){
    redirect('/restaurant');
    return null;
  }
  return ( 
    <Wrapper tags={tags} tagId={currentTagId}>
      <Content searchParam={searchTag} />
    </Wrapper>
  );
}