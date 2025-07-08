"use client"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { API_RestaurantDetail } from "@/types/api/restaurant";
import * as D from "@/modules/client/StyledComponent/Detail";
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import Image from "next/image";
import { useRef } from "react";
import { API_UsersSchema } from "@/types/api/users";
import CommentDrawer, { CommentDrawerRef } from "@/modules/client/_app/_components/CommentDrawer";
import css from './css';

export default function Main({
  docId,
  detail,
  userProfile
}:{
  docId:string;
  detail:API_RestaurantDetail,
  userProfile?:API_UsersSchema | null
}){
  const drawerRef = useRef<CommentDrawerRef>(null);
    
  return (
    <>
      <D.Container>
        <D.Flex>
          <D.FlexMain>
            <D.Row>
              <D.Title>{detail.name}</D.Title>
              <ChatBubbleOutlineIcon className={css.commentIcon} onClick={() => drawerRef?.current?.openDrawer() } />
            </D.Row>
            {
              detail.reviews.map((item, index) => (
                <section key={index}>
                  <D.Review>{item.review}</D.Review>
                  {
                    item.pic && <img src={item.pic} className={css.foodImage} alt={detail.name} fetchPriority={!index ? 'high' : 'low' } />
                  }
                </section>
              ))
            }
          </D.FlexMain>
          <D.FlexSide>
            {
              detail.rate && (
                <>
                  <D.InfoText>評分</D.InfoText>
                  <DuplicateComponent times={detail.rate}>
                    <Image src='/images/star-icon.svg' width={25} height={25} alt='rate' className={css.starIcon} />
                  </DuplicateComponent>
                </>
              )
            }
            {
              detail.location && (
                <D.SubInfoWrap>
                  <D.InfoText>位置</D.InfoText>
                  <iframe src={detail.location} className={css.iframe} allowFullScreen={undefined} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </D.SubInfoWrap>
              )
            }
            {
              detail.tags && (
                <D.SubInfoWrap>
                  {
                    detail.tags.map((tag,index) => <D.Tag key={`tag-${index}`}>{tag}</D.Tag>)
                  }
                </D.SubInfoWrap>
              )
            }
          </D.FlexSide>
        </D.Flex>
      </D.Container>
      <CommentDrawer ref={drawerRef} type='restaurant' docId={docId} userProfile={userProfile} />
    </>
  )
}