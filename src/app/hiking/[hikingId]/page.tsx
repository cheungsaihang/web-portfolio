import type { Metadata } from 'next'
import { API_HikingDetail } from "@/types/api/hiking";
import HikingDetail from "./content";
import { WEBSITE_NAME } from '@/constants';
import { isErrorResponse } from '@/utils/nextResponse';
import { API_Error, API_Success } from '@/types/api';

async function getHikingDetail(docId:string){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking/' + docId, { cache: 'no-store' });
  const body = await res.json() as API_Error | API_Success<API_HikingDetail>;
  if(isErrorResponse(body)){
    return null;
  }
  const data = body as API_Success<API_HikingDetail>;
  return data.result;
}

export async function generateMetadata({ params }: { params: Promise<{ hikingId: string }> }): Promise<Metadata> {
  //Generate page metadata when build the app
  const { hikingId } = await params;
  const detail = await getHikingDetail(hikingId);

  if(!detail){
    return { title: `${WEBSITE_NAME}`, description: '' }
  }

  const pics = detail.pics.slice(0,2);
  return {
    title: `${WEBSITE_NAME} - ${detail.name}`,
    description: detail.reviews[0],
    openGraph: {
      images: pics,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ hikingId: string }> }) {
  const { hikingId } = await params;
  const detail = await getHikingDetail(hikingId);

  return (
    <>
      {
      !detail 
      ? <div>Page not Found</div> 
      : <HikingDetail detail={detail} />
      }
    </>
  );
}