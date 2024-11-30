import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import RestaurantListing from "./content";

async function getRestaurantList(){
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant',{ next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant',{ cache: 'no-store' });
  return await res.json();
}
async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/restaurant',{ cache: 'no-store' });
  const data = await res.json() as string[];
  const tags = ['全部',...data];
  return tags;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 餐廳`,
  description: "分享日式，韓式，泰式等多種唔同餐廳食評及用餐體驗。",
}

export default async function Page() {
  const list = await getRestaurantList();
  const tags = await getTags();

  return (
    <div>
        {list ? <RestaurantListing type={'restaurant'} tags={tags} resultSet={list}/> : <div>No Data</div>}
    </div>
  );
}