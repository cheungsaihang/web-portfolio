"use client"
import { useState } from 'react';
import { css } from '@pigment-css/react';
import { TitleWrap, Title, Card } from '@/modules/client/StyledComponent/Listing';
import Grid from '@/modules/client/Grid';
import LazyImage from '@/modules/client/LazyImage';
import Tags from '@/modules/client/TagsSelector';
import useQuery from '@/hooks/useQuery';
import Loading from './customLoading';
import { API_HikingList } from '@/types/api/hiking';
import { useSearchParams } from 'next/navigation';

const cssLazyImage = css(({theme}) => ({
  width:'100%',
  aspectRatio: '4 / 3',
  backgroundColor: theme.vars.colors.skeleton
}));

export default function HikingListing({tags, records}:{tags:string[]; records:API_HikingList[] | null;}){
  const searchParams = useSearchParams();
  const [list, setList] = useState(records); 
  const [isPending, query] = useQuery();

  const tag = searchParams.get('tags');
  const initTagIndex = tag && tags.indexOf(tag) > 0 ? tags.indexOf(tag): 0;

  const filterFn = (key:number) => {
    const url = `/api/hiking`;
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
            <Tags.Tag key={`tag-${index}`} tagId={index} href={index ? `/hiking?tags=${tag}` : '/hiking'}  onClick={() => filterFn(index) }>{tag}</Tags.Tag>
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
                  list.map((item, index) => (
                    <Grid.Col key={item.id}> 
                      <Card href={`/hiking/${item.id}`}>
                        <LazyImage src={item.pic} alt={item.name} className={cssLazyImage} objectFit='cover' priority={index < 6 ? 'high' : 'low'} />
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

