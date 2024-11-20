import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from '@/modules/client/DuplicateComponent';
import * as D from "@/modules/client/StyledComponent/Detail";

export default function Loading() {
  return (
    <SkeletonAnimation>
      <D.Container>
        <SkeletionView width={100} rounded /><br />
        <D.Flex>
          <D.FlexMain>
            <DuplicateComponent times={3}>
              <SkeletionView rounded /><br />
            </DuplicateComponent>
          </D.FlexMain>
          <D.FlexSide>
            <D.PictureGrid>
              <DuplicateComponent times={4}>
                <D.PictureWrap><SkeletionView width={'100%'} height={'100%'} /></D.PictureWrap>
              </DuplicateComponent>
            </D.PictureGrid>
          </D.FlexSide>
        </D.Flex>
      </D.Container>
    </SkeletonAnimation>
  );
}