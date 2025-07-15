"use client"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { API_RestaurantDetail } from "@/types/api/restaurant";
import Styled from "@/modules/client/StyledComponent/Detail";
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import Image from "next/image";
import { useRef } from "react";
import { API_UsersSchema } from "@/types/api/users";
import CommentDrawer, { CommentDrawerRef } from "@/modules/client/_app/_components/CommentDrawer";
import className from './css';

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
      <Styled.Article>
        <Styled.Flex>
          <Styled.Main>
            <Styled.Flex justifyContent='space-between' alignItems='center'>
              <Styled.Title>{detail.name}</Styled.Title>
              <ChatBubbleOutlineIcon className={className.commentIcon} onClick={() => drawerRef?.current?.openDrawer() } />
            </Styled.Flex>
            {
              detail.reviews.map((item, index) => (
                <section key={index} className={className.mt_s}>
                  <Styled.P>{item.review}</Styled.P>
                  {
                    item.pic && <img src={item.pic} className={className.foodImage} alt={detail.name} fetchPriority={!index ? 'high' : 'low' } />
                  }
                </section>
              ))
            }
          </Styled.Main>
          <Styled.Aside>
            {
              detail.rate && (
                <>
                  <Styled.P bolder>評分</Styled.P>
                  <DuplicateComponent times={detail.rate}>
                    <Image src='/images/star-icon.svg' width={25} height={25} alt='rate' className={className.starIcon} />
                  </DuplicateComponent>
                </>
              )
            }
            {
              detail.location && (
                <div className={className.mt_s}>
                  <Styled.P bolder>位置</Styled.P>
                  <iframe src={detail.location} className={className.iframe} allowFullScreen={undefined} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              )
            }
            {
              detail.tags && (
                <div className={className.mt_s}>
                  {
                    detail.tags.map((tag,index) => <Styled.Tag key={`tag-${index}`}>{tag}</Styled.Tag>)
                  }
                </div>
              )
            }
          </Styled.Aside>
        </Styled.Flex>
      </Styled.Article>
      <CommentDrawer ref={drawerRef} type='restaurant' docId={docId} userProfile={userProfile} />
    </>
  )
}