import { css } from "@pigment-css/react";
import { mt_s, starIcon } from "../../css";

const foodImage = css(({theme}) => ({
  width:'100%',
  maxWidth:480,
  marginTop:5,
  borderRadius:5,
  [`@media (max-width: ${theme.media.screenXS})`]:{
    width:'100%'
  }
}));

const iframe = css({
  width:'100%',
  height:250,
  border:'2px solid #eeeeee',
  borderRadius:5
});

const commentIcon = css(({theme}) => ({
  color:theme.colors.icon,
  fontSize:`${theme.sizes.fonts.iconSmaller} !important`,
}));

const className = {
  foodImage,
  iframe,
  starIcon,
  commentIcon,
  mt_s
};

export default className;