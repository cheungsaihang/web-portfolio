"use client"
import { styled, keyframes } from '@pigment-css/react';
import { ReactNode } from 'react';

type CSSNumber = number | `${number}%`;

type SkeletionProps = {
  width?:CSSNumber;
  height?:CSSNumber;
  rounded?:boolean;
  aspectRatio?:'1 / 1' | '4 / 3' | '3 / 4' | '16 / 9' | '9 / 16';
}

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
});

const Skeleton = styled('div')<SkeletionProps>(({theme}) => ({
  backgroundColor:theme.colors.skeleton,
  aspectRatio:({aspectRatio}) => aspectRatio ? aspectRatio : undefined,
  width:({width}) => width ? width : '75%',
  height:({height, aspectRatio}) => aspectRatio ? undefined : ( height ? height : 14 ),
  borderRadius:({rounded}) => rounded ? 20 : undefined,
}));

export function SkeletonAnimation({children}:{children:ReactNode}){
  return (
    <AnimationWrapper>{children}</AnimationWrapper>
  );
}

export function SkeletionView(rest:SkeletionProps & {
  className?:string
}){
  return <Skeleton {...rest} />;
}