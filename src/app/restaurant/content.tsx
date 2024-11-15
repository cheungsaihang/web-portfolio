"use client"
import { css } from '@pigment-css/react';
import { TitleWrap, Title, Card } from '@/modules/client/StyledComponent/Listing';
import Grid from '@/modules/client/Grid';
import LazyImage from '@/modules/client/LazyImage';

type ListItem = {
  id:string;
  name:string;
  link:string;
  pic:string;
};

type ListType = 'hiking' | 'restaurant';

const cssLazyImage = css({
  width:'100%',
  aspectRatio: '4 / 3',
  backgroundColor: '#dddddd'
});

export default function RestaurantListing({type,list}:{type:ListType; list:ListItem[];}){
  return (
    <Grid>
      {
        list.map((item) => (
          <Grid.Col key={item.id}> 
            <Card href={`/${type}/${item.id}`}>
              <LazyImage src={item.pic} alt={item.name} className={cssLazyImage} objectFit='cover' />
              <TitleWrap><Title>{item.name}</Title></TitleWrap>
            </Card>
          </Grid.Col>
        ))
      }
    </Grid>
  )
}

