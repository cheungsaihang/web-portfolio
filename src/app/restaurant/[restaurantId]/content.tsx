"use client"
import { css } from "@pigment-css/react";
import { API_RestaurantDetail } from "@/types/api/restaurant.d";
import * as Detail from "@/modules/client/StyledComponent/Detail";

const cssImage = css(({theme}) => ({
  width:'50%',
  [`@media (max-width: ${theme.media.screenM})`]:{
    width:'100%'
  }
}));

export default function RestaurantDetail({detail}:{detail:API_RestaurantDetail}){
  return (
    <Detail.Container>
      <Detail.Title>{detail.name}</Detail.Title>
      <Detail.ContentWrap>
        <Detail.ReviewWrap>
          {
            detail.reviews.map((item, index) => (
              <section key={index}>
                <Detail.Reviews>{item.review}</Detail.Reviews>
                {
                  item.pic && <img src={item.pic} className={cssImage} alt={detail.name} fetchPriority={!index ? 'high' : 'low' } />
                }
              </section>
            ))
          }
        </Detail.ReviewWrap>
      </Detail.ContentWrap>
    </Detail.Container>
  )
}
//<iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3691.5865857455074!2d114.24078117529235!3d22.293644929691343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e2!4m3!3m2!1d22.2952811!2d114.2412983!4m5!1s0x340403de7f1a0b7d%3A0xb7b3d200aa77cac6!2z5rK55aGY6KGb5aWV5L-h5b6RM-autemtlOmsvOWxsQ!3m2!1d22.2916226!2d114.2421493!5e0!3m2!1szh-TW!2shk!4v1730103006447!5m2!1szh-TW!2shk" width="100%" height="450" style={{border:0}} loading="lazy"></iframe>