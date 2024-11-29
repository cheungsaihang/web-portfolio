"use client"
import { useState } from 'react';
import { css } from '@pigment-css/react';
import { TitleWrap, Title, Card } from '@/modules/client/StyledComponent/Listing';
import { CollectionType } from '@/modules/server/api';
import Grid from '@/modules/client/Grid';
import LazyImage from '@/modules/client/LazyImage';
import Tags from '@/modules/client/TagsSelector';
import useQuery from '@/hooks/useQuery';
import Loading from './customLoading';

type ListItem = {
  id:string;
  name:string;
  link:string;
  pic:string;
};

const cssLazyImage = css(({theme}) => ({
  width:'100%',
  aspectRatio: '4 / 3',
  backgroundColor: theme.vars.colors.skeleton
}));

export default function HikingListing({type,tags, resultSet}:{type:CollectionType; tags:string[]; resultSet:ListItem[];}){
  const [list, setList] = useState(resultSet); 
  const [activeTag, setActiveTag] = useState(0);
  const [isPending, query] = useQuery(setList);

  const vaildateKey = (key:number) => (key > 0 && key < tags.length) ? key : 0;
  const filterFn = (key:number) => {
    const vaildKey = vaildateKey(key);
    const url = `/api/search?cid=${type}`;
    const search = vaildKey ? `&tags=${tags[vaildKey]}` : '';
    setActiveTag(vaildKey);
    query(url + search, { next :{ revalidate:900 } });
  }

  return (
    <div>
      <Tags>
        {
          tags.map((tag,index) => (
            <Tags.Tag key={`tag-${index}`} onClick={() => filterFn(index) } active={index == activeTag}>{tag}</Tags.Tag>
          ))
        }
      </Tags>
      {
        isPending 
        ? <Loading /> 
        : (
          <Grid>
          {
            list.map((item, index) => (
              <Grid.Col key={item.id}> 
                <Card href={`/${type}/${item.id}`}>
                  <LazyImage src={item.pic} alt={item.name} className={cssLazyImage} objectFit='cover' priority={index < 6 ? 'high' : 'low'} />
                  <TitleWrap><Title>{item.name}</Title></TitleWrap>
                </Card>
              </Grid.Col>
            ))
          }
          </Grid>
        )
      }
    </div>
  )
}

