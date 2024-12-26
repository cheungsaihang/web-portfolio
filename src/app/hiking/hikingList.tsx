"use client"
import { ScrollContextProvider } from "./useContext";
import { API_HikingList } from "@/types/api/hiking";
import HikingListItem from "./hikingListItems";

export default function HikingList({
  apiUrl,
  initList
}:{
  apiUrl:string
  initList:{list:API_HikingList[] | null, isMorePage:boolean}
}) {
  const {list, isMorePage} = initList;
 
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