import { styled } from "@pigment-css/react";

export const Container = styled('div')({
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  marginTop:10
});

export const Frame = styled('div')({
  borderWidth:1,
  borderColor:'#cccccc',
  borderStyle:'solid',
  borderRadius:10,
  padding:10,
  maxWidth:480,
  width:'80%',
});

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
  padding:3,
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