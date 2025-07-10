"use client"
import ShowCaseRestaurants from "./showcase";
import { ScrollContextProvider } from "./useContext";
import { listRestaurants } from "@/libs/frontend/api/hobby/restaurant";

export default function Container({
  initalList,
  query,
}:{
  initalList:Awaited<ReturnType<typeof listRestaurants>>
  query:string
}) {
  return (
    <ScrollContextProvider
      query={query}
      initalList={initalList?.list || []}
      initalMore={initalList?.isMorePage || false}
    >
      <ShowCaseRestaurants />
    </ScrollContextProvider>
  );
}