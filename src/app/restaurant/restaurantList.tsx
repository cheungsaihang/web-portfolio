"use client"
import { ScrollContextProvider } from "./useContext";
import { API_RestaurantList } from "@/types/api/restaurant";
import RestaurantListItems from "./restaurantListItems";

export default function RestaurantList({
  apiUrl,
  initList
}:{
  apiUrl:string
  initList:{list:API_RestaurantList[] | null, isMorePage:boolean}
}) {
  const {list, isMorePage} = initList;
 
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