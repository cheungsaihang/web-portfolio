"use client"
import { CSSProperties, useState } from "react";
import { styled, css } from "@pigment-css/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const LeftDiv = styled('div')({
  position:'fixed',
  top:'50%',
  left:5,
  zIndex:2003
});

const RightDiv = styled('div')({
  position:'fixed',
  top:'50%',
  right:5,
  zIndex:2003
});

const cssIcon = css(({theme}) => ({
  fontSize:`3rem !important`,
  color: theme.colors.icon,
}));


export default function Gallery({
  index,
  pics,
  alt
} : {
  index:number; 
  pics:string[]; 
  alt:string 
}){
  const [imgStyle, setImgStyle] = useState<CSSProperties>({ display:'none' });
  const [imgIndex, setImgIndex] = useState<number>(index);
  const picCount = pics.length;

  const onImageLoad = (e:any) => {
    const target = e.target as HTMLImageElement;
    let style:CSSProperties = { display: 'block', maxWidth:'85vw' };
    if(target?.naturalWidth && target?.naturalHeight){
      if(target.naturalHeight > target.naturalWidth ){
        style = { display: 'block', maxHeight:'85vh' };
      }
    }
    setImgStyle(style);
  }

  const handleImageChange = (index:number) => {
    setImgStyle({ display:'none' });
    setImgIndex((thisIndex) => {
      const newIndex = thisIndex + index;
      if(newIndex >= picCount){
        return 0;
      }
      if(newIndex < 0){
        return (picCount - 1);
      }
      return newIndex;
    });
  }
  return(
    <>
      <TransformWrapper>
          <TransformComponent>
            <img src={pics[imgIndex]} onLoad={onImageLoad} alt={alt} style={imgStyle}  />
          </TransformComponent>
      </TransformWrapper>
      {
        picCount > 1 && (
          <>
            <LeftDiv><ChevronLeftIcon className={cssIcon} onClick={() => handleImageChange(-1)} /></LeftDiv>
            <RightDiv><ChevronRightIcon className={cssIcon} onClick={() => handleImageChange(1)} /></RightDiv>
          </>
        )
      }
    </>
  );
}