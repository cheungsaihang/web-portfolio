import { styled } from '@pigment-css/react';

export const Container = styled('article')({
  display:'block',
  marginTop:'1rem'
});

export const Flex = styled('div')(({theme}) => ({
  width:'100%',
  display:'flex',
  justifyContent:'space-between',
  marginBottom:'1rem',
  [`@media (max-width: ${theme.media.screenM})`]:{
    display:'block' 
  }
}));

export const FlexMain = styled('div')(({theme}) => ({
  width:'calc(100% - 332px)',
  paddingRight:30,
  [`@media (max-width: ${theme.media.screenM})`]:{
    width:'100%',
    paddingRight:0 
  }
}));

export const FlexSide = styled('div')(({theme}) => ({
  width:302,
  [`@media (max-width: ${theme.media.screenS})`]:{
    width:'100%',
    marginTop:20,
  }
}));

export const Title = styled('h1')(({theme}) => ({
  fontSize:'2rem',
  color:theme.vars.colors.foreground,
}));

export const Review = styled('p')(({theme}) => ({
  fontSize:'1.4rem',
  marginTop:20,
  color:theme.vars.colors.foreground,
}));

export const PictureGrid = styled('div')({
  display:'grid',
  gridTemplateColumns:'auto auto',
  gridColumnGap:2,
  width:302,
});

export const PictureWrap = styled('div')({
  width:150,
  height:150,
  position:'relative',
  marginTop:2
});

export const PictureShadowMore = styled('div')({
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

export const InfoText = styled('p')(({theme}) => ({
  fontSize:'1.4rem',
  color:theme.vars.colors.foreground,
  fontWeight:'bolder'
}));

export const SubInfoWrap = styled('div')({
  marginTop:10,
});

export const Tag = styled('span')(({theme}) => ({
  display:'inline-block',
  padding:'4px 15px',
  borderRadius:15,
  backgroundColor:theme.colors.skeleton,
  color:theme.colors.foreground,
  marginRight:3,
  marginBottom:3,
  fontSize:'1.3rem'
}));

export const DifficultText = styled('div')(({theme}) => ({
  display:'flex',
  alignItems:'center',
  fontSize:'1.3rem',
  color:theme.vars.colors.foreground,
  paddingLeft:1
}));