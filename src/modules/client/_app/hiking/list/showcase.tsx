"use client"
import Styled from '@/modules/client/StyledComponent/Listing';
import Grid from '@/modules/client/Grid';
import LazyImage from '@/modules/client/LazyImage';
import { NoDataListing } from "@/modules/client/NoDataComponent";
import { useScrollContext } from './useContext';
import { ListingSkeletion } from '../../_components/PageSkeletion';
import Card from '@/modules/client/Card';
import className from './css';

export default function ShowCaseHikings(){
  const [ snapshot ]  = useScrollContext();

  if(!snapshot.list){
    return null;
  }

  return (
    <div>
      {
        ! snapshot.list.length 
        ? <NoDataListing /> 
        : (
          <>
            <Grid width={'100%'} cols={3} gap={'1%'} responsive>
            {
              snapshot.list.map((item, index) => (
                <Grid.Col key={item.id} className={className.listItem}> 
                  <Card href={`/hiking/${item.id}`}>
                    <LazyImage src={item.pic} alt={item.name} className={className.lazyImage} objectFit='cover' priority={index < 6 ? 'high' : 'low'} />
                    <Styled.TitleWrap><Styled.Title>{item.name}</Styled.Title></Styled.TitleWrap>
                  </Card>
                </Grid.Col>
              ))
            }
            </Grid>
            {
              snapshot.isPending && <ListingSkeletion />
            }
          </>   
        )
      }
    </div>
  )
}