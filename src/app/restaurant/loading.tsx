import Grid from "@/modules/client/Grid";
import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import { TitleWrap, Card } from '@/modules/client/StyledComponent/Listing';

export default function Loading() {
  return (
    <>
      <SkeletonTags />
      <SkeletionContent />
    </>
  )
}

function SkeletonTags(){
  return (
    <SkeletonAnimation>
      <DuplicateComponent times={4}>
        <SkeletionView width={46} height={26.5} rounded style={{display:'inline-block', marginRight:5}}/>
      </DuplicateComponent>
    </SkeletonAnimation>
  )
}

export function SkeletionContent(){
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
