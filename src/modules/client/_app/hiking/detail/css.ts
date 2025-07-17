import { css } from "@pigment-css/react";
import { mt_s, mt_xl, starIcon } from '../../css';

const hikingImage = css(({theme}) => ({
  width:'100%',
  height:'100%',
  backgroundColor: theme.vars.colors.skeleton
}));

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
const gridCol = css({
  width:150,
  height:150,
  position:'relative',
  marginBottom:2
});

const className = {
  hikingImage,
  iframe,
  starIcon,
  difficult,
  mt_s,
  mt_xl,
  gridCol
};

export default className;