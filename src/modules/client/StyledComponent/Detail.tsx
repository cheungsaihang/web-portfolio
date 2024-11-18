import { styled } from '@pigment-css/react';

export const Container = styled('div')({
  marginTop:'1rem'
});

export const ContentWrap = styled('div')(({theme}) => ({
  width:'100%',
  display:'flex',
  justifyContent:'stretch',
  marginBottom:'1rem',
  [`@media (max-width: ${theme.media.screenM})`]:{
    display:'block' 
  }
}));

export const Title = styled('h1')(({theme}) => ({
  fontSize:'2rem',
  color:theme.vars.colors.foreground,
}));

export const ReviewWrap = styled('div')(({theme}) => ({
  width:'100%',
  paddingRight:20,
  [`@media (max-width: ${theme.media.screenM})`]:{
    paddingRight:0 
  }
}));

export const Reviews = styled('p')(({theme}) => ({
  fontSize:'1.4rem',
  marginTop:20,
  color:theme.vars.colors.foreground,
}));

export const PictureGrid = styled('div')({
  display:'grid',
  gridTemplateColumns:'auto auto',
  margin:'0px -1px',
  width:302,
});

export const PictureWrap = styled('div')({
  width:150,
  height:150,
  position:'relative',
  margin:1
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