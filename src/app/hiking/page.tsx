import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import { API_HikingList } from "@/types/api/hiking";
import { API_ListResponse } from "@/types/api";
import HikingListing from "./content";
import Container from "./container";

async function getHikingList(){
  const res = await fetch(`${process.env.API_ENDPOINT}/api/hiking`,{ cache: 'no-store' });
  return await res.json() as API_ListResponse<API_HikingList>;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 行山`,
  description: "分享魔鬼山,龍脊,釣魚翁,獅子山及更多行山徑的前往方法及感受。",
};

export default async function Page() {
  const res = await getHikingList();
  return ( 
    <Container res={res}>
      <HikingListing /> 
    </Container>
  );
}

