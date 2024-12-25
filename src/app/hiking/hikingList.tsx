"use client"
import { use } from "react";
import { ScrollContextProvider } from "./useContext";
import { API_HikingList } from "@/types/api/hiking";
import HikingListItem from "./hikingListItems";

export default function HikingList({
  apiUrl,
  listPromise
}:{
  apiUrl:string
  listPromise:Promise<{list:API_HikingList[] | null, isMorePage:boolean}>
}) {
  const {list, isMorePage} = use(listPromise);
 
  return (
    <ScrollContextProvider
      url={apiUrl}
      initalList={list || []}
      initalMore={isMorePage}
    >
      <HikingListItem />
    </ScrollContextProvider>
  );
}