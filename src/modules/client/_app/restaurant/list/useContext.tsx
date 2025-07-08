"use client"
import { useContext, ReactNode } from "react";
import createScrollPaginationContext from "@/contexts/scrollPaginationContext";
import { API_RestaurantList } from "@/types/api/restaurant";
import { listRestaurants } from "@/libs/frontend/api/hobby/restaurant";

type List = API_RestaurantList;

const [ScrollContext, ScrollProvider ] = createScrollPaginationContext<List>();

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if(!context){
    throw new Error("Scroll Context must be used inside of the Scroll Provider");
  }
  return [
    context.store.useExternalStore(),
  ] as const;
}

export const ScrollContextProvider = (props:{
  query:string;
  initalList:List[] | null;
  initalMore:boolean;
  children:ReactNode;
}) => {
  return (
    <ScrollProvider
      initalList={props.initalList}
      isMorePage={props.initalMore}
      onEndReached={onEndReached(props.query)}
    >
      {props.children}
    </ScrollProvider>
  );
}

const onEndReached = (query:string) => async (nextPage:number) => {
  const withPageQuery = `${query}${query!=''?'&':'?'}page=${nextPage}`;
  const res = await listRestaurants(withPageQuery);
  if(!res.list){
    return null;
  }
  return {
    newList:res.list,
    haveMore:res.isMorePage,
    currentPage:nextPage
  }
}
