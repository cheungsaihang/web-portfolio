import { styled } from "@pigment-css/react";

export const Container = styled('div')({
  marginTop:10,
  display:'flex',
  justifyContent:'center',
});
export const Frame = styled('div')(({theme}) => ({
  padding:20,
  borderWidth:1,
  borderColor:theme.colors.skeleton,
  borderStyle:'solid',
  borderRadius:10,
}));
export const Row = styled('div')({
  display:'flex',  
  paddingTop:10,
  paddingBottom:10,
});
export const Label = styled('div')(({theme}) => ({
  fontSize:'1.5rem',
  color:theme.vars.colors.foreground,
  width:100,
  textAlign:'center',
  fontWeight:'bolder',
}));
export const Value = styled('div')(({theme}) => ({
  fontSize:'1.5rem',
  color:theme.vars.colors.foreground,
  width:200,
}));