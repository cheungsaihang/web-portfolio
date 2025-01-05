import { ReactNode } from "react";
import Header from "./_components/Header";
import { API_Error, API_Success } from "@/types/api";
import { isErrorResponse } from "@/utils/nextResponse";
import { isServerBuild } from "@/utils/common";

async function getTags(){
  if(isServerBuild()){
    const tagsApi = await import("@/libs/firebase/tagsApi");
    const tags = await tagsApi.fetchTags('hiking');
    if(!tags){
      throw Error('Build Error - Cannot get hikign page tags');
    }
    return tags;
  }
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/hiking',{ cache: 'no-store' });
  const body = await res.json() as API_Success<string[]> | API_Error;
  const tags = isErrorResponse(body) ? ['全部'] : ['全部',...body.result];
  return tags;
}

export default async function Layout({children}:{children:ReactNode}) {
  const tags = await getTags();
  return (
    <>
      <Header tags={tags}/>
      {children}
    </>
  );
}

export const dynamic = "force-dynamic";