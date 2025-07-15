import { styled } from '@pigment-css/react';

export const Article = styled('article')({
  display:'block',
  marginTop:'1rem'
});

export const Flex = styled('div')<{
  reverse?:boolean;
  justifyContent?:"center" | "space-between";
  alignItems?:"center" | "end";
  responsive?:boolean;
}>(({theme}) => ({
  width:'100%',
  display:'flex',
  flexDirection:({reverse}) => reverse ? 'row-reverse' : 'row',
  justifyContent:({justifyContent}) => justifyContent ? justifyContent : undefined,
  alignItems:({alignItems}) => alignItems ? alignItems : undefined,
  [`@media (max-width: ${theme.media.screenM})`]:{
    display: ({responsive}) => responsive ? 'block' : 'flex'
  }
}));

export const Main = styled('div')(({theme}) => ({
  width:'calc(100% - 332px)',
  paddingRight:30,
  [`@media (max-width: ${theme.media.screenM})`]:{
    width:'100%',
    paddingRight:0 
  }
}));

export const Aside = styled('aside')(({theme}) => ({
  width:302,
  [`@media (max-width: ${theme.media.screenS})`]:{
    width:'100%',
    marginTop:'2rem',
  }
}));

export const P = styled('p')<{
  bolder?:boolean
}>(({theme}) => ({
  fontSize:'1.4rem',
  color:theme.vars.colors.foreground,
  fontWeight:({bolder}) => bolder ? 'bolder' : 'normal'
}));

export const ShadowCover = styled('div')({
  position:'absolute',
  top:0,
  left:0,
  width:'100%',
  height:'100%',
  backgroundColor:'rgba(0,0,0,.6)',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  textAlign:'center',
  color:'#FAFAFA',
  fontSize:'2rem'
});