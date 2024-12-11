import type { Metadata } from 'next'
import { API_RestaurantDetail } from "@/types/api/restaurant";
import Content from "./content";
import { WEBSITE_NAME } from '@/constants';

async function getRestaurantDetail(docId:string):Promise<API_RestaurantDetail>{
  const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant/' + docId, { cache: 'no-store' });
  return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ restaurantId: string }> }): Promise<Metadata> {
  //Generate page metadata when build the app
  const { restaurantId } = await params;
  const detail = await getRestaurantDetail(restaurantId); 
  const pics = detail.reviews.map((review) => review.pic ? review.pic : null).filter((pic) => pic != null).slice(0,2);
  return {
    title: `${WEBSITE_NAME} - ${detail.name}`,
    description: detail.reviews[0].review,
    openGraph: {
      images: pics,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ restaurantId: string }> }) {
  //SSR page
  const { restaurantId } = await params;
  const detail = await getRestaurantDetail(restaurantId);  
  return (
    <>
        {
        !detail 
        ? <div>Page not Found</div> 
        : <Content detail={detail} />
        }
    </>
  );
}