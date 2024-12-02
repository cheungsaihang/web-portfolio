"use client"
import { useState } from 'react';
import { css } from '@pigment-css/react';
import useQuery from '@/hooks/useQuery';
import { TitleWrap, Title, Card } from '@/modules/client/StyledComponent/Listing';
import Grid from '@/modules/client/Grid';
import LazyImage from '@/modules/client/LazyImage';
import Tags from '@/modules/client/TagsSelector';
import Loading from './customLoading';
import { API_HikingList } from '@/types/api/hiking';
import { useSearchParams } from 'next/navigation';

const cssLazyImage = css({
  width:'100%',
  aspectRatio: '4 / 3',
  backgroundColor: '#dddddd'
});

export default function RestaurantListing({tags, records}:{tags:string[]; records:API_HikingList[] | null;}){
  const searchParams = useSearchParams();
  const [list, setList] = useState(records);
  const [isPending, query] = useQuery();

  const tag = searchParams.get('tags');
  const initTagIndex = tag && tags.indexOf(tag) > 0 ? tags.indexOf(tag): 0;

  const filterFn = (key:number) => {
    const url = `/api/restaurant`;
    const search = key ? `?tags=${tags[key]}` : '';
    query(url + search, { next :{ revalidate:900 } }).then((data) => {
      setList(data?.records);
    });
  }

  return (
    <div>
      <Tags initTagIndex={initTagIndex}>
        {
          tags.map((tag,index) => (
            <Tags.Tag key={`tag-${index}`} tagId={index} href={index ? `/restaurant?tags=${tag}` : '/restaurant'} onClick={() => filterFn(index) }>{tag}</Tags.Tag>
          ))
        }
      </Tags>
      {
        isPending 
        ? <Loading />
        : (
          <>
          {
            list ? (
              <Grid>
              {
                list.map((item) => (
                  <Grid.Col key={item.id}> 
                    <Card href={`/restaurant/${item.id}`}>
                      <LazyImage src={item.pic} alt={item.name} className={cssLazyImage} objectFit='cover' />
                      <TitleWrap><Title>{item.name}</Title></TitleWrap>
                    </Card>
                  </Grid.Col>
                ))
              }
              </Grid>
            ) : (
              <div>No Data</div>
            )
          }
          </>
        )
      }
    </div>
  )
}