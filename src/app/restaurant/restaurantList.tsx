"use client"
import { use } from "react";
import { ScrollContextProvider } from "./useContext";
import { API_RestaurantList } from "@/types/api/restaurant";
import RestaurantListItems from "./restaurantListItems";

export default function HikingList({
  apiUrl,
  listPromise
}:{
  apiUrl:string
  listPromise:Promise<{list:API_RestaurantList[] | null, isMorePage:boolean}>
}) {
  const {list, isMorePage} = use(listPromise);
 
  return (
    <ScrollContextProvider
      url={apiUrl}
      initalList={list || []}
      initalMore={isMorePage}
    >
      <RestaurantListItems />
    </ScrollContextProvider>
  );
}