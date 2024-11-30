import type { Metadata } from 'next'
import { API_HikingDetail } from "@/types/api/hiking";
import HikingDetail from "./content";
import { WEBSITE_NAME } from '@/constants';

async function getHikingDetail(docId:string):Promise<API_HikingDetail>{
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking/' + docId, { next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking/' + docId, { cache: 'no-store' });
  return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ hikingId: string }> }): Promise<Metadata> {
  //Generate page metadata when build the app
  const { hikingId } = await params;
  const detail = await getHikingDetail(hikingId);
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