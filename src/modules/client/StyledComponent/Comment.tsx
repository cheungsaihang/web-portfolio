import { styled } from "@pigment-css/react";

export const CommentForm = styled('div')({
  padding:10,
});

export const CommentRow = styled('div')<{
  reverse?:boolean;
  center?:boolean;
}>({
  display:'flex',
  flexDirection:({reverse}) => reverse ? 'row-reverse' : 'row',
  justifyContent:({center}) => center ? 'center' : undefined,
  alignItems:'center',
  marginBottom:5
});

export const CommentInputWrap = styled('div')({
  display:'flex',
  flex:1,
  paddingLeft:10
});

export const CommentInput = styled('input')(({theme}) => ({
  backgroundColor:theme.colors.skeleton,
  border:`1px ${theme.colors.skeleton} solid`,
  borderRadius:3,
  padding:3,
  width:'100%'
}));

export const CommentSubmit = styled('button')(({theme}) => ({
  backgroundColor:theme.colors.buttonSecond,
  borderWidth:0,
  borderRadius:10,
  width:60,
  paddingTop:1,
  paddingBottom:1,
  fontSize:'1.3rem',
  color:'#FFFFFF',
  variants:[{
    props: { disabled: true },
    style: { backgroundColor: theme.colors.buttonSecondBlur },
  }],
}));

export const CommentLoginFirst = styled('button')(({theme}) => ({
  backgroundColor:theme.colors.button,
  borderWidth:0,
  borderRadius:10,
  width:100,
  paddingTop:2,
  paddingBottom:2,
  fontSize:'1.4rem',
  color:'#FFFFFF',
  marginBottom:5,
  cursor:'pointer'
}));

export const CommentErrorMsg = styled('div')<{center?:boolean}>(({theme}) => ({
  fontSize:'1.3rem',
  color:theme.colors.errorText,
  marginBottom:5,
  paddingLeft:35
}));