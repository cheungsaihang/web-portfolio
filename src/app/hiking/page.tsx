import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import HikingListing from "./content";

async function getHikingList(){
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking',{ next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking',{ cache: 'no-store' });
  return await res.json();
}

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/hiking',{ cache: 'no-store' });
  const data = await res.json() as string[];
  const tags = ['全部',...data];
  return tags;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 行山`,
  description: "分享魔鬼山,龍脊,釣魚翁,獅子山及更多行山徑的前往方法及感受。",
};

export default async function Page() {
  const resultSet = await getHikingList();
  const tags = await getTags();

  return (
    <>
      { resultSet ? <HikingListing type={'hiking'} tags={tags} resultSet={resultSet}/> : <div>No Data</div>}
    </>
  );
}

