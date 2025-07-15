import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from '@/modules/client/DuplicateComponent';
import Styled from "@/modules/client/StyledComponent/Detail";

export default function Loading() {
  return (
    <SkeletonAnimation>
      <Styled.Article>
        <SkeletionView width={100} rounded /><br />
        <Styled.Flex>
          <Styled.Main>
            <DuplicateComponent times={2}>
              <br />
              <SkeletionView rounded width={'70%'} />
              <br />
              <SkeletionView rounded width={'65%'} />
              <br />
              <SkeletionView width={'55%'} height={250} />
            </DuplicateComponent>
          </Styled.Main>
        </Styled.Flex>
      </Styled.Article>
    </SkeletonAnimation>
  );
}