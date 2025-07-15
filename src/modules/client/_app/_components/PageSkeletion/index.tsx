
import Grid from "@/modules/client/Grid";
import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import Styled from '@/modules/client/StyledComponent/Listing';
import Card from "@/modules/client/Card";

export function TagsSkeleton(){
  return (
    <SkeletonAnimation>
      <DuplicateComponent times={4}>
        <SkeletionView width={46} height={26.5} rounded style={{display:'inline-block', marginRight:5}}/>
      </DuplicateComponent>
    </SkeletonAnimation>
  )
}

export function ListingSkeletion(){
  return (
    <SkeletonAnimation>
      <Grid>
        <DuplicateComponent>
          <Grid.Col>
            <Card>
              <SkeletionView width={'100%'} aspectRatio='4 / 3' />
              <Styled.TitleWrap><SkeletionView rounded /></Styled.TitleWrap>
            </Card>
          </Grid.Col>
        </DuplicateComponent>
      </Grid>
    </SkeletonAnimation>
  )
}