import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from '@/modules/client/DuplicateComponent';
import * as Detail from "@/modules/client/StyledComponent/Detail";

export default function Loading() {
  return (
    <SkeletonAnimation>
      <Detail.Container>
        <SkeletionView width={100} rounded /><br />
        <Detail.ContentWrap>
          <Detail.ReviewWrap>
            <DuplicateComponent times={3}>
              <SkeletionView rounded /><br />
            </DuplicateComponent>
          </Detail.ReviewWrap>
          <Detail.PictureGrid>
            <DuplicateComponent times={4}>
              <Detail.PictureWrap><SkeletionView width={'100%'} height={'100%'} /></Detail.PictureWrap>
            </DuplicateComponent>
          </Detail.PictureGrid>
        </Detail.ContentWrap>
      </Detail.Container>
    </SkeletonAnimation>
  );
}