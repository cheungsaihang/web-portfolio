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

const className = {
  hikingImage,
  iframe,
  starIcon
};

export default className;