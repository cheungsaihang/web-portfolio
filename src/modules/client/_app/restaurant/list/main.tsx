"use client"
import ShowCaseRestaurants from "./showcase";
import { ScrollContextProvider } from "./useContext";
import useInitialEffect from "@/hooks/useInitialEffect";
import { listRestaurants } from "@/libs/frontend/api/hobby/restaurant";
import { ListingSkeletion } from "../../_components/PageSkeletion";

export default function Main({
  query,
}:{
  query:string
}) {
  const [isInited, initalList] = useInitialEffect(listRestaurants,query);

  if(!isInited){
    return <ListingSkeletion />;
  }

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