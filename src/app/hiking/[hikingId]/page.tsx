import { API_HikingDetail } from "@/types/api/hiking";
import HikingDetail from "./content";

async function getHikingDetail(docId:string):Promise<API_HikingDetail>{
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking/' + docId, { next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking/' + docId, { cache: 'no-store' });
  return await res.json();
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