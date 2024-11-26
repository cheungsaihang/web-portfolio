import { API_RestaurantDetail } from "@/types/api/restaurant";
import Content from "./content";

async function getRestaurantDetail(docId:string):Promise<API_RestaurantDetail>{
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant/' + docId, { next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant/' + docId, { cache: 'no-store' });
  return await res.json();
}

export default async function Page({ params }: { params: Promise<{ restaurantId: string }> }) {
  const { restaurantId } = await params;
  const detail = await getRestaurantDetail(restaurantId);
  
  return (
    <div>
        {
        !detail 
        ? <div>Page not Found</div> 
        : <Content detail={detail} />
        }
    </div>
  );
}