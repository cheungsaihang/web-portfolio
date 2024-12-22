import type { Metadata } from 'next'
import { API_RestaurantDetail } from "@/types/api/restaurant";
import Content from "./content";
import { WEBSITE_NAME } from '@/constants';
import { isErrorResponse } from '@/utils/nextResponse';
import { API_Error, API_Success } from '@/types/api';

async function getRestaurantDetail(docId:string){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant/' + docId, { cache: 'no-store' });
  const body = await res.json() as API_Error | API_Success<API_RestaurantDetail>;
  if(isErrorResponse(body)){
    return null;
  }
  const data = body as API_Success<API_RestaurantDetail>;
  return data.result;
}

export async function generateMetadata({ params }: { params: Promise<{ restaurantId: string }> }): Promise<Metadata> {
  //Generate page metadata when build the app
  const { restaurantId } = await params;
  const detail = await getRestaurantDetail(restaurantId); 

  if(!detail){
    return { title: `${WEBSITE_NAME}`, description: '' }
  }

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