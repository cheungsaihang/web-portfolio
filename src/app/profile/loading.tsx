import { SkeletonAnimation, SkeletionView } from '@/modules/client/Skeleton';
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import * as P from "@/modules/client/StyledComponent/Profile";

export default function Loading() {
  return (
    <SkeletonAnimation>
      <P.Container>
        <P.Frame>
          <DuplicateComponent>
            <P.Row>
              <P.Label><SkeletionView rounded /></P.Label>
              <P.Value><SkeletionView rounded /></P.Value>
            </P.Row>
          </DuplicateComponent>
        </P.Frame>
      </P.Container>
    </SkeletonAnimation>
  )
}
