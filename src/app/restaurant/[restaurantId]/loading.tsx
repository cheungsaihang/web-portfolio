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
            <DuplicateComponent times={2}>
              <br />
              <SkeletionView rounded width={'60%'} />
              <br />
              <SkeletionView width={'50%'} height={200} />
            </DuplicateComponent>
          </Detail.ReviewWrap>
        </Detail.ContentWrap>
      </Detail.Container>
    </SkeletonAnimation>
  );
}