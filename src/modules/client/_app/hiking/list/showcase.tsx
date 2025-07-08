"use client"
import { css } from '@pigment-css/react';
import { TitleWrap, Title, Card } from '@/modules/client/StyledComponent/Listing';
import Grid from '@/modules/client/Grid';
import LazyImage from '@/modules/client/LazyImage';
import { NoDataListing } from "@/modules/client/NoDataComponent";
import { useScrollContext } from './useContext';
import { ListingSkeletion } from '../../_components/PageSkeletion';

const cssLazyImage = css(({theme}) => ({
  width:'100%',
  aspectRatio: '4 / 3',
  backgroundColor: theme.vars.colors.skeleton
}));

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
            <Grid>
            {
              snapshot.list.map((item, index) => (
                <Grid.Col key={item.id}> 
                  <Card href={`/hiking/${item.id}`}>
                    <LazyImage src={item.pic} alt={item.name} className={cssLazyImage} objectFit='cover' priority={index < 6 ? 'high' : 'low'} />
                    <TitleWrap><Title>{item.name}</Title></TitleWrap>
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