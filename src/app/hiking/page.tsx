import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import { API_Error, API_Success } from "@/types/api";
import Tags from '@/modules/server/TagsSelector';
import { isErrorResponse } from "@/utils/nextResponse";
import dynamic from "next/dynamic";
import Loading from "./_loading";
import { getKeyParam } from "@/utils/nextRequest";
import { SearchParams } from "@/types";
import { redirect } from "next/navigation";

const Content = dynamic(() => import('./content'),{
  loading: () => <Loading />,
})

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/hiking',{ cache: 'no-store' });
  const body = await res.json() as API_Success<string[]> | API_Error;
  const tags = isErrorResponse(body) ? ['全部'] : ['全部',...body.result];
  return tags;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 行山`,
  description: "分享魔鬼山,龍脊,釣魚翁,獅子山及更多行山徑的前往方法及感受。",
};

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const tags = await getTags();
  const searchTag = getKeyParam((await searchParams),'tags');
  const currentTagId = searchTag && tags.indexOf(searchTag) || 0;
  if(currentTagId < 0){
    redirect('/hiking');
    return null;
  }
  return ( 
    <>
      <Tags>
        {
          tags.map((tag,index) => (
            <Tags.Tag href={`/hiking?tags=${tag}`} isActive={(index == currentTagId)} key={`tag-${index}`}>{tag}</Tags.Tag>
          ))
        }
      </Tags>
      <Content tags={tags} tagId={currentTagId} />
    </>
  );
}

