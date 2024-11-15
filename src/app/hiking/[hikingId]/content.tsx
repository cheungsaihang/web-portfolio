"use client"
import { useRef } from "react";
import { API_HikingDetail } from "@/types/api/hiking";
import { css } from "@pigment-css/react";
import { usePopupWrapper, PopupWrapper } from "@/modules/client/PopupWrapper";
import Gallery from "@/modules/client/Gallery";
import * as Detail from "@/modules/client/StyledComponent/Detail";
import LazyImage from "@/modules/client/LazyImage";


const cssImg = css(({theme}) => ({
  width:'100%',
  height:'100%',
  backgroundColor: theme.vars.colors.skeleton
}));

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
    <Detail.Container>
      <Detail.Title>{detail.name}</Detail.Title>
      <Detail.ContentWrap>
        <Detail.ReviewWrap>
          {
            detail.reviews.map((review, index) => (
              <Detail.Reviews key={`review-${index}`}>{review}</Detail.Reviews>
            ))
          }
        </Detail.ReviewWrap>
        <Detail.PictureGrid>
          {
            pics.map((pic,index) => (
              <Detail.PictureWrap key={`picture-${index}`} onClick={() => popupZoom(index)}>
                <LazyImage src={pic} alt={detail.name} className={cssImg} objectFit="cover"/>
                {
                  (picsCount > 4 && index == 3) && (
                    <Detail.PictureShadowMore>+{(picsCount - 4)}</Detail.PictureShadowMore>
                  )
                }
              </Detail.PictureWrap>
            ))
          }
        </Detail.PictureGrid>
      </Detail.ContentWrap>
      <PopupWrapper control={wrapperControl}>
        <Gallery index={zoomPic.current} pics={detail.pics} alt={detail.name} />
      </PopupWrapper>
    </Detail.Container>
  )
}
//<iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3691.5865857455074!2d114.24078117529235!3d22.293644929691343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e2!4m3!3m2!1d22.2952811!2d114.2412983!4m5!1s0x340403de7f1a0b7d%3A0xb7b3d200aa77cac6!2z5rK55aGY6KGb5aWV5L-h5b6RM-autemtlOmsvOWxsQ!3m2!1d22.2916226!2d114.2421493!5e0!3m2!1szh-TW!2shk!4v1730103006447!5m2!1szh-TW!2shk" width="100%" height="450" style={{border:0}} loading="lazy"></iframe>