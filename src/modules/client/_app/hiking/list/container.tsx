"use client"
import { ScrollContextProvider } from "./useContext";
import { listHikings } from "@/libs/frontend/api/hobby/hiking";
import ShowCaseHikings from "./showcase";

export default function Container({
  initalList,
  query,
}:{
  initalList:Awaited<ReturnType<typeof listHikings>>
  query:string
}) {
  return (
    <ScrollContextProvider
      query={query}
      initalList={initalList?.list || []}
      initalMore={initalList?.isMorePage || false}
    >
      <ShowCaseHikings />
    </ScrollContextProvider>
  );
}