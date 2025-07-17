import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from '@/modules/client/DuplicateComponent';
import Styled from "@/modules/client/StyledComponent/Detail";
import Grid from '@/modules/client/Grid';
import className from "@/modules/client/_app/hiking/detail/css";

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
            <Grid width={302} gap={2} cols={2}>
              <DuplicateComponent times={4}>
                <Grid.Col className={className.gridCol}>
                  <SkeletionView width={'100%'} height={'100%'} />
                </Grid.Col>
              </DuplicateComponent>
            </Grid>
          </Styled.Aside>
        </Styled.Flex>
      </Styled.Article>
    </SkeletonAnimation>
  );
}