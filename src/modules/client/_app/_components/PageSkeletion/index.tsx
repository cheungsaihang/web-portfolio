
import Grid from "@/modules/client/Grid";
import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import Styled from '@/modules/client/StyledComponent/Listing';
import Card from "@/modules/client/Card";
import { listItem } from "../../css";
import { css } from "@pigment-css/react";

const className = {
  listItem,
  skeleton:css({display:'inline-block', marginRight:5})
}

export function TagsSkeleton(){
  return (
    <SkeletonAnimation>
      <DuplicateComponent times={4}>
        <SkeletionView width={46} height={26.5} rounded className={className.skeleton} />
      </DuplicateComponent>
    </SkeletonAnimation>
  )
}

export function ListingSkeletion(){
  return (
    <SkeletonAnimation>
      <Grid width={'100%'} cols={3} gap={'1%'} responsive>
        <DuplicateComponent>
          <Grid.Col className={className.listItem}>
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