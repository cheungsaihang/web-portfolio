import { css } from "@pigment-css/react";

const hikingImage = css(({theme}) => ({
  width:'100%',
  height:'100%',
  backgroundColor: theme.vars.colors.skeleton
}));
const starIcon = css({
  marginLeft:-5,
  marginRight:5
});
const iframe = css({
  width:'100%',
  maxWidth:600,
  height:350,
  border:'2px solid #eeeeee',
  borderRadius:5
});
const difficult = css(({theme}) => ({
  fontSize:'1.3rem',
  color:theme.vars.colors.foreground,
  paddingLeft:1
}));
const mt_s = css({
  marginTop:10
});
const mt_xl = css({
  marginTop:40
});

const className = {
  hikingImage,
  iframe,
  starIcon,
  difficult,
  mt_s,
  mt_xl
};

export default className;