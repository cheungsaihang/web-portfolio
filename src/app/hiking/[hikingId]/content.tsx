"use client"
import { useRef } from "react";
import { API_HikingDetail } from "@/types/api/hiking";
import { css } from "@pigment-css/react";
import { usePopupWrapper, PopupWrapper } from "@/modules/client/PopupWrapper";
import Gallery from "@/modules/client/Gallery";
import * as D from "@/modules/client/StyledComponent/Detail";
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
    <D.Container>
      <D.Title>{detail.name}</D.Title>
      <D.Flex>
        <D.FlexMain>
          {
            detail.reviews.map((review, index) => (
              <D.Review key={`review-${index}`}>{review}</D.Review>
            ))
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
      <PopupWrapper control={wrapperControl}>
        <Gallery index={zoomPic.current} pics={detail.pics} alt={detail.name} />
      </PopupWrapper>
    </D.Container>
  )
}