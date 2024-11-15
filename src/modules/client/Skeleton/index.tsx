"use client"
import { styled, keyframes } from '@pigment-css/react';
import { ReactNode, CSSProperties } from 'react';

const animationEffect = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
  }
`;
const AnimationWrapper = styled('div')({
  animation: `${animationEffect} 1s ease-in-out infinite`,
  animationDirection:'alternate'
})

export function SkeletonAnimation({children}:{children:ReactNode}){
  return (
    <AnimationWrapper>{children}</AnimationWrapper>
  );
}

export function SkeletionView({
  width,
  height,
  rounded,
  aspectRatio,
}:{
  width?:number | string;
  height?:number | string;
  rounded?:boolean;
  aspectRatio?:'1 / 1' | '4 / 3' | '3 / 4' | '16 / 9' | '9 / 16';
}){
  const Skeleton = styled('div')(({theme}) => ({
    backgroundColor:theme.colors.skeleton,
  }));
  const _width = width ? width : '75%';
  const _height = height ? height : 14;
  const style = {
    aspectRatio: aspectRatio ? aspectRatio : undefined,
    width: _width,
    height: aspectRatio ? undefined : _height,
    borderRadius: rounded ? 20 : undefined
  } as CSSProperties;
  return <Skeleton style={style}/>;
}
