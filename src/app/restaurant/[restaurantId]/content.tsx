"use client"
import { css } from "@pigment-css/react";
import { API_RestaurantDetail } from "@/types/api/restaurant";
import * as D from "@/modules/client/StyledComponent/Detail";
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import Image from "next/image";

const cssImage = css(({theme}) => ({
  width:'100%',
  maxWidth:480,
  marginTop:5,
  borderRadius:5,
  [`@media (max-width: ${theme.media.screenXS})`]:{
    width:'100%'
  }
}));
const cssIframe = css({
  width:'100%',
  height:250,
  border:'2px solid #eeeeee',
  borderRadius:5
});
const cssStarIcon = css({
  marginLeft:-5,
  marginRight:5
});

export default function RestaurantDetail({detail}:{detail:API_RestaurantDetail}){
  return (
    <D.Container>
      <D.Title>{detail.name}</D.Title>
      <D.Flex>
        <D.FlexMain>
          {
            detail.reviews.map((item, index) => (
              <section key={index}>
                <D.Review>{item.review}</D.Review>
                {
                  item.pic && <img src={item.pic} className={cssImage} alt={detail.name} fetchPriority={!index ? 'high' : 'low' } />
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
                  <Image src='/images/star-icon.svg' width={25} height={25} alt='rate' className={cssStarIcon} />
                </DuplicateComponent>
              </>
            )
          }
          {
            detail.location && (
              <D.SubInfoWrap>
                <D.InfoText>位置</D.InfoText>
                <iframe src={detail.location} className={cssIframe} allowFullScreen={undefined} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
  )
}
