"use client"
import { styled, keyframes } from '@pigment-css/react';
import RefreshIcon from '@mui/icons-material/Refresh';

const animationEffect = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const AnimationWrapper = styled('div')({
  animation: `${animationEffect} 2s linear infinite`,
  animationDirection:'running',
  marginTop:-1
})

export function LoadingIcon({
  fontSize,
  className
}:{
  fontSize?:string|number;
  className?:string;
}){
  const _fontSize = fontSize ? fontSize : '2rem';
  return (
    <AnimationWrapper style={{width:_fontSize, height:_fontSize}}><RefreshIcon className={className} style={{fontSize:_fontSize}} /></AnimationWrapper>
  );
}