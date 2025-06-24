import { styled } from "@pigment-css/react";

export const Container = styled('div')(({theme}) => ({
  display:'flex',
  justifyContent:'center',
  marginTop:10,
  [`@media (max-width: ${theme.media.screenS})`]:{
    display:'block',
  }
}));

export const Frame = styled('div')(({theme}) => ({
  borderWidth:1,
  borderColor:'#cccccc',
  borderStyle:'solid',
  borderRadius:10,
  padding:10,
  maxWidth:480,
  width:'80%',
  margin:'0px 10px 0px 0px',
  [`@media (max-width: ${theme.media.screenS})`]:{
    margin:'0px auto 10px',
  }
}));

export const Form = styled('div')({
  padding:10,
  paddingTop:25,
});

export const Field = styled('div')({
  marginBottom:15
});

export const Label = styled('label')(({theme}) => ({
  fontSize:'1.5rem',
  marginBottom:5,
  color:theme.vars.colors.foreground
}));

export const Input = styled('div')({
  display:'flex',
  justifyContent:'center',
  paddingTop:3,
  paddingBottom:3,
  borderWidth:1,
  borderColor:'#cccccc',
  borderStyle:'solid',
  borderRadius:5,
});

export const Error = styled('div')<{center?:boolean}>(({theme}) => ({
  fontSize:'1.5rem',
  height:20,
  color:theme.colors.errorText,
  textAlign: ({center}) => ( center ? 'center' : 'left' )
}));

export const ButtonWrap = styled('div')({
  display:'flex',
  justifyContent:'center',
});

export const Button = styled('button')(({theme}) => ({
  backgroundColor:theme.colors.button,
  borderWidth:0,
  borderRadius:5,
  width:100,
  paddingTop:5,
  paddingBottom:5,
  fontSize:'1.5rem',
  color:'#FFFFFF',
  variants:[{
    props: { disabled: true },
    style: { backgroundColor: theme.colors.buttonBlur },
  }],
}));

export const Info = styled('div')(({theme}) => ({
  padding:15,
  margin:'0px 0px 0px 10px',
  borderRadius:10,
  backgroundColor:theme.colors.skeleton,
  [`@media (max-width: ${theme.media.screenS})`]:{
    width:'80%',
    maxWidth:480,
    margin:'0px auto',
  }
}));

export const InfoText = styled('div')(({theme}) => ({
  fontSize:'1.5rem',
  marginBottom:5,
  color:theme.colors.foreground
}));

