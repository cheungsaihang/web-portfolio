import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import RestaurantListing from "./content";
import { API_RestaurantList } from "@/types/api/restaurant";
import { API_ListResponse } from "@/types/api";
import Container from "./container";

async function getRestaurantList(){
  const res = await fetch(`${process.env.API_ENDPOINT}/api/restaurant` ,{ cache: 'no-store' });
  return await res.json() as API_ListResponse<API_RestaurantList>;
}

export const metadata: Metadata = {
  title: `${WEBSITE_NAME} - 餐廳`,
  description: "分享日式，韓式，泰式等多種唔同餐廳食評及用餐體驗。",
}

export default async function Page() {
  const res = await getRestaurantList();
  return ( 
    <Container res={res}>
      <RestaurantListing /> 
    </Container>
  );
}