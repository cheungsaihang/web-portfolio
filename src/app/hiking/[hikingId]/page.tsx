import type { Metadata } from 'next'
import { WEBSITE_NAME } from '@/constants';
import { getHiking } from '@/libs/frontend/api/hobby/hiking';
import Main from '@/modules/client/_app/hiking/detail/main';
import { NoDataListing } from '@/modules/client/NoDataComponent';

export async function generateMetadata({ params }: { params: Promise<{ hikingId: string }> }): Promise<Metadata> {
  //Generate page metadata when build the app
  const { hikingId } = await params;
  const detail = await getHiking(hikingId);

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
  const detail = await getHiking(hikingId);

  return (
    <>
      {
        ! detail 
        ? <NoDataListing />
        : <Main detail={detail} />
      }
    </>
  );
}