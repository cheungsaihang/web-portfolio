import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import RestaurantListing from "./content";
import { SearchParams } from "@/types"
import { API_HikingList } from "@/types/api/hiking";

type Response = {
  records:API_HikingList[] | null;
  tags:string[];
}

async function getRestaurantList(searchParams:SearchParams){
  const search = searchParams.tags ? `?tags=${searchParams.tags}` : '';
  const res = await fetch(`${process.env.API_ENDPOINT}/api/restaurant${search}` ,{ cache: 'no-store' });
  return await res.json() as Response;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 餐廳`,
  description: "分享日式，韓式，泰式等多種唔同餐廳食評及用餐體驗。",
}

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const params = await searchParams;
  const {records, tags} = await getRestaurantList(params);

  return ( <RestaurantListing tags={tags} records={records}/> );
}