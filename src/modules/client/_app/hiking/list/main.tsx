"use client"
import { ScrollContextProvider } from "./useContext";
import useInitialEffect from "@/hooks/useInitialEffect";
import { ListingSkeletion } from "../../_components/PageSkeletion";
import { listHikings } from "@/libs/frontend/api/hobby/hiking";
import ShowCaseHikings from "./showcase";

export default function Main({
  query,
}:{
  query:string
}) {
  const [isInited, initalList] = useInitialEffect(listHikings,query);

  if(!isInited){
    return <ListingSkeletion />;
  }

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