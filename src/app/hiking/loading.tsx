import Grid from "@/modules/client/Grid";
import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import { TitleWrap, Card } from '@/modules/client/StyledComponent/Listing';

export default function Loading() {
  return (
    <SkeletonAnimation>
      <Grid>
        <DuplicateComponent>
          <Grid.Col>
            <Card>
              <SkeletionView width={'100%'} aspectRatio='4 / 3' />
              <TitleWrap><SkeletionView rounded /></TitleWrap>
            </Card>
          </Grid.Col>
        </DuplicateComponent>
      </Grid>
    </SkeletonAnimation>
  )
}
