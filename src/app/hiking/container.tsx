"use client"
import { ReactNode, useState } from "react";
import Tags from '@/modules/client/TagsSelector';
import { API_URL } from "@/constants/api";
import { ScrollContextProvider } from "./useContext";
import useQuery from '@/hooks/useQuery';
import Loading from "./_loading";
import { API_HikingList } from "@/types/api/hiking";
import { API_ListResponse } from "@/types/api";

export default function Container({res,children}:{res:API_ListResponse<API_HikingList>;children:ReactNode}) {
  const [isPending, query] = useQuery();
  const [response, resetResponse] = useState({
    list:res.records,
    isMorePage: res.pagination.isMorePage,
    apiUrl: API_URL.hiking
  });

  const tags = res.tags;
  const onClickTag = (key:number) => {
    const apiUrl = `${API_URL.hiking}${key ? `?tags=${tags[key]}` : '' }`;
    query(apiUrl, { next :{ revalidate:900 } }).then((data:API_ListResponse<API_HikingList>) => {
      if(data){
        resetResponse({
          list: data.records,
          isMorePage: data.pagination.isMorePage,
          apiUrl:apiUrl
        });
      }
    });
  }
  return (
    <>  
      <Tags initTagIndex={0}>
        {
          tags.map((tag,index) => (
            <Tags.Tag key={`tag-${index}`} tagId={index} onClick={onClickTag}>{tag}</Tags.Tag>
          ))
        }
      </Tags>
      { 
        isPending 
        ? <Loading /> 
        : (
          <ScrollContextProvider
            url={response.apiUrl}
            initalList={response.list || []}
            initalMore={response.isMorePage}
            >
            {children}
          </ScrollContextProvider>
        )
      }
    </>
  );
}