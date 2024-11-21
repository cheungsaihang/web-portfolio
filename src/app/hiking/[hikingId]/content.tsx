"use client"
import { useRef } from "react";
import { API_HikingDetail } from "@/types/api/hiking";
import { css } from "@pigment-css/react";
import { usePopupWrapper, PopupWrapper } from "@/modules/client/PopupWrapper";
import Gallery from "@/modules/client/Gallery";
import * as D from "@/modules/client/StyledComponent/Detail";
import LazyImage from "@/modules/client/LazyImage";
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import Image from "next/image";

const cssImg = css(({theme}) => ({
  width:'100%',
  height:'100%',
  backgroundColor: theme.vars.colors.skeleton
}));
const cssStarIcon = css({
  marginLeft:-5,
  marginRight:5
});
const cssIframe = css({
  width:'100%',
  maxWidth:600,
  height:350,
  border:'2px solid #eeeeee',
  borderRadius:5
});

export default function HikingDetail({detail}:{detail:API_HikingDetail}){
  const picsCount = detail.pics.length;
  const pics = picsCount > 4 ? detail.pics.slice(0,4) : detail.pics;
  const zoomPic = useRef<number>(0);
  const wrapperControl = usePopupWrapper();

  const popupZoom = (picIndex:number) => {
    zoomPic.current = picIndex;
    wrapperControl.setShowWrapper(true);
  }

  return (
    <D.Container>
      <D.Title>{detail.name}</D.Title>
      {
        detail.difficult && (
          <D.DifficultText>
            難度：
            <DuplicateComponent times={detail.difficult}>
              <Image src='/images/star-icon.svg' width={18} height={18} alt='difficult' className={cssStarIcon} />
            </DuplicateComponent>
          </D.DifficultText>
        )
      }
      <D.Flex>
        <D.FlexMain>
          {
            detail.reviews.map((review, index) => (
              <D.Review key={`review-${index}`}>{review}</D.Review>
            ))
          }
          {
            detail.tags && (
              <D.SubInfoWrap className={css({marginTop:40})}>
                {
                  detail.tags.map((tag,index) => <D.Tag key={`tag-${index}`}>{tag}</D.Tag>)
                }
              </D.SubInfoWrap>
            )
          }
        </D.FlexMain>
        <D.FlexSide>
          <D.PictureGrid>
            {
              pics.map((pic,index) => (
                <D.PictureWrap key={`picture-${index}`} onClick={() => popupZoom(index)}>
                  <LazyImage src={pic} alt={detail.name} className={cssImg} objectFit="cover"/>
                  {
                    (picsCount > 4 && index == 3) && (
                      <D.PictureShadowMore>+{(picsCount - 4)}</D.PictureShadowMore>
                    )
                  }
                </D.PictureWrap>
              ))
            }
          </D.PictureGrid>
        </D.FlexSide>
      </D.Flex>
      {
        detail?.map && (
          <D.SubInfoWrap>
            <D.InfoText>路線</D.InfoText>
            <iframe src={detail.map} className={cssIframe} allowFullScreen={undefined} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </D.SubInfoWrap>
        )
      }
      <PopupWrapper control={wrapperControl}>
        <Gallery index={zoomPic.current} pics={detail.pics} alt={detail.name} />
      </PopupWrapper>
    </D.Container>
  )
}