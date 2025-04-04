"use client"
import { useContext, ReactNode } from "react";
import createScrollPaginationContext, { OnEndReached } from "@/contexts/scrollPaginationContext";
import { API_RestaurantList } from "@/types/api/restaurant";
import { API_ListResponse, API_Success } from "@/types/api";

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
  url:string;
  initalList:List[];
  initalMore:boolean;
  children:ReactNode;
}) => {
  return (
    <ScrollProvider
      initalList={props.initalList}
      initalMore={props.initalMore}
      onEndReached={onEndReached(props.url)}
    >
      {props.children}
    </ScrollProvider>
  );
}

const onEndReached = (url:string) => {
  const query:OnEndReached<List> = async (nextPage:number) => {
    const pageQuery = `${url.search(/\?/) != -1 ? '&' : '?'}page=${nextPage}`;
    const res = await fetch(`${url}${pageQuery}`, { next: { revalidate: 900 }});
    const body = await res.json() as API_Success<API_ListResponse<List>>;
    const data = body.result;
    if(data.records){
      return {
        newList:data.records,
        haveMore:data.pagination.isMorePage,
        currentPage:data.pagination.currentPage
      }
    }
    return null;
  }
  return query;
}