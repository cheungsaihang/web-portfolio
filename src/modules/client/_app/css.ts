import { css } from "@pigment-css/react";

export const mt_s = css({
  marginTop:10
});
export const mt_xl = css({
  marginTop:40
});

export const listItem = css({
  borderRadius:10,
  overflow:'hidden',
  border:'1px solid rgba(0,0,0,.1)', 
  borderBottom:'2px solid rgba(0,0,0,.2)',
  marginTop:15 
});

export const lazyImage = css(({theme}) => ({
  width:'100%',
  aspectRatio: '4 / 3',
  backgroundColor: theme.vars.colors.skeleton
}));

export const starIcon = css({
  marginLeft:-5,
  marginRight:5
});