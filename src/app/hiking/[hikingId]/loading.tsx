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
            <DuplicateComponent times={3}>
              <SkeletionView rounded /><br />
            </DuplicateComponent>
          </Styled.Main>
          <Styled.Aside>
            <Styled.PictureGrid>
              <DuplicateComponent times={4}>
                <Styled.PictureWrap><SkeletionView width={'100%'} height={'100%'} /></Styled.PictureWrap>
              </DuplicateComponent>
            </Styled.PictureGrid>
          </Styled.Aside>
        </Styled.Flex>
      </Styled.Article>
    </SkeletonAnimation>
  );
}