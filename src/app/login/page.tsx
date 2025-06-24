import { SearchParams } from "@/types";
import { getKeyParam } from "@/utils/nextRequest";
import Main from "./ui/main";

export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {
  const referer = getKeyParam((await searchParams),'referer');
  return ( 
    <Main referer={referer}/>
  );
}