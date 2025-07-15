"use client"
import { API_HikingDetail } from "@/types/api/hiking";
import { PopupWrapper } from "@/modules/client/PopupWrapper";
import Gallery from "@/modules/client/Gallery";
import Styled from "@/modules/client/StyledComponent/Detail";
import LazyImage from "@/modules/client/LazyImage";
import DuplicateComponent from "@/modules/client/DuplicateComponent";
import className from "./css";
import { usePopupGallery } from "./usePopupGallery";

export default function Main({detail}:{detail:API_HikingDetail}){
  const {picState, wrapperControl, showPopup} = usePopupGallery();
  const [ slicedPics, remainCount ] = handlePictureStuff(detail.pics);

  return (
    <Styled.Article>
      <Styled.Title>{detail.name}</Styled.Title>
      <Styled.Flex alignItems="center" className={className.difficult}>
        難度：
        <DuplicateComponent times={detail.difficult}>
          <img src='/images/star-icon.svg' width={18} height={18} alt='difficult' className={className.starIcon} />
        </DuplicateComponent>
      </Styled.Flex>

      <Styled.Flex>
        <Styled.Main>
          {
            detail.reviews.map((review, index) => <Styled.P key={`review-${index}`} className={className.mt_s}>{review}</Styled.P>)
          }
          <div className={className.mt_xl}>
          {
            detail.tags.map((tag,index) => <Styled.Tag key={`tag-${index}`}>{tag}</Styled.Tag>)
          }
          </div>
        </Styled.Main>
        <Styled.Aside>
          <Styled.PictureGrid>
          {
            slicedPics.map((pic,index) => (
              <Styled.PictureWrap key={`picture-${index}`} onClick={() => showPopup(index)}>
                <LazyImage src={pic} alt={detail.name} className={className.hikingImage} objectFit="cover"/>
                {
                  (remainCount > 0 && index == 3) && (
                    <Styled.ShadowCover>+{remainCount}</Styled.ShadowCover>
                  )
                }
              </Styled.PictureWrap>
            ))
          }
          </Styled.PictureGrid>
        </Styled.Aside>
      </Styled.Flex>
      <div className={className.mt_s}>
        <Styled.P bolder>路線</Styled.P>
        <iframe src={detail.map} className={className.iframe} allowFullScreen={undefined} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <PopupWrapper control={wrapperControl}>
        <Gallery index={picState.current} pics={detail.pics} alt={detail.name} />
      </PopupWrapper>
    </Styled.Article>
  )
}

function handlePictureStuff(pics:string[], take:number = 4){
  const picsCount = pics.length;
  const slicedPics = picsCount > take ? pics.slice(0,take) : pics;
  const remainCount = picsCount > take ? picsCount - take : 0;
  return [ slicedPics, remainCount ] as const;
}