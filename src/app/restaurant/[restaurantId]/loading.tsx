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
            <DuplicateComponent times={2}>
              <br />
              <SkeletionView rounded width={'70%'} />
              <br />
              <SkeletionView rounded width={'65%'} />
              <br />
              <SkeletionView width={'55%'} height={250} />
            </DuplicateComponent>
          </D.FlexMain>
        </D.Flex>
      </D.Container>
    </SkeletonAnimation>
  );
}