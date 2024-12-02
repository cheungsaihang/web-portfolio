import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import HikingListing from "./content";
import { SearchParams } from "@/types"
import { API_HikingList } from "@/types/api/hiking";

type Response = {
  records:API_HikingList[] | null;
  tags:string[];
}

async function getHikingList(searchParams:SearchParams){
  const search = searchParams.tags ? `?tags=${searchParams.tags}` : '';
  const res = await fetch(`${process.env.API_ENDPOINT}/api/hiking${search}`,{ cache: 'no-store' });
  return await res.json() as Response;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 行山`,
  description: "分享魔鬼山,龍脊,釣魚翁,獅子山及更多行山徑的前往方法及感受。",
};

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const params = await searchParams;
  const {records, tags} = await getHikingList(params);

  return ( <HikingListing tags={tags} records={records}/> );
}

