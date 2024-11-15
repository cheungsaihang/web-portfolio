'use client'
import { useState, CSSProperties, useLayoutEffect } from 'react'

//To fix when object fit is cover mode in chrome browser. 
export default function LazyImage({
  src,
  alt,
  className,
  objectFit,
  priority,
}:{
  src:string;
  alt:string,
  className?:string,
  objectFit?:'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
  priority?:'auto' | 'high' | 'low'
}){
  const [isReady, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const _priority = priority ? priority : 'auto';

  const style = {
    width:'100%',
    height:'100%',
    display:'block',
    opacity: isReady ? 1 : 0,
    objectFit: objectFit ? objectFit : 'fill'
  } as CSSProperties;

  useLayoutEffect(() => {
    //fix safari cannot fire onload event
    setMounted(true);
  },[]);

  const onload = () => setReady(true); 

  return (
    <div className={className}>
      { mounted && <img src={src} alt={alt} style={style} onLoad={onload} fetchPriority={_priority} /> }
    </div>
  )
}