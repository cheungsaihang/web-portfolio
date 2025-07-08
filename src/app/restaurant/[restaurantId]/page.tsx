import type { Metadata } from 'next'
import { WEBSITE_NAME } from '@/constants';
import Main from '@/modules/client/_app/restaurant/detail/main';
import { NoDataListing } from '@/modules/client/NoDataComponent';
import { getProfile } from '@/libs/frontend/api/auth';
import { getRestaurant } from '@/libs/frontend/api/hobby/restaurant';

export async function generateMetadata({ params }: { params: Promise<{ restaurantId: string }> }): Promise<Metadata> {
  const { restaurantId } = await params;
  const detail = await getRestaurant(restaurantId); 

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
  const userProfile = await getProfile();  
  const detail = await getRestaurant(restaurantId);  
  return (
    <>
      {
        !detail 
        ? <NoDataListing />
        : <Main detail={detail} userProfile={userProfile} docId={restaurantId} />
      }
    </>
  );
}