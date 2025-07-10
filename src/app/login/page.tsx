import { SearchParams } from "@/types";
import { getKeyParam } from "@/utils/nextRequest";
import Main from "@/modules/client/_app/login/main";

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const referer = getKeyParam((await searchParams),'referer');
  return ( 
    <Main referer={referer}/>
  );
}