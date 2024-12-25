"use client"
import { useState } from "react";
import dynamic from "next/dynamic";
import Tags from '@/modules/client/TagsSelector';
import Loading from "./_loading";
import { API_URL } from "@/constants/api";
import { API_Error, API_ListResponse, API_Success } from "@/types/api";
import { API_HikingList } from "@/types/api/hiking";
import { isErrorResponse } from "@/utils/nextResponse";
import { isServer } from "@/utils/common";

const HikingList = dynamic(() => import('./hikingList'),{
  loading: () => <Loading />,
  ssr:false
})

export default function Content({tags}:{tags:string[];}) {
  const [currentTag, setCurrentTag] = useState(0);
  const apiUrl = API_URL.hiking + `${currentTag ? `?tags=${tags[currentTag]}` : '' }`;
  const listPromise = getInitalList(apiUrl);

  return (
    <>  
      <Tags>
        {
          tags.map((tag,index) => (
            <Tags.Tag key={`tag-${index}`} tagId={index} onClick={setCurrentTag}>{tag}</Tags.Tag>
          ))
        }
      </Tags>
      <HikingList listPromise={listPromise} apiUrl={apiUrl} />
    </>
  );
}

async function getInitalList(path:string){
  try{
    const apiUrl = isServer() ? process.env.API_ENDPOINT + path : path;
    const res = await fetch(apiUrl);
    const body = await res.json() as API_Success<API_ListResponse<API_HikingList>> | API_Error;
    if(!isErrorResponse(body)){
      return {
        list:body.result.records,
        isMorePage:body.result.pagination.isMorePage
      }
    }
  }
  catch(err){
    console.log('Hiking List - getInitalList',err);
  }
  return {
    list:null,
    isMorePage:false
  }
}