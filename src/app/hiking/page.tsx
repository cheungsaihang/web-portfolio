import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { getKeyParam } from "@/utils/nextRequest";
import { SearchParams } from "@/types";

const Content = dynamic(() => import('./content'),{
  loading: () => <Loading />,
})

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 行山`,
  description: "分享魔鬼山,龍脊,釣魚翁,獅子山及更多行山徑的前往方法及感受。",
};

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const searchTag = getKeyParam((await searchParams),'tags');
  return ( 
    <Content searchParam={searchTag}/>
  );
}

