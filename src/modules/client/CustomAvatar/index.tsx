import { styled } from "@pigment-css/react";
import { CSSProperties } from "react";

const StyledAvatar = styled('div')({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#ff6666',
  width:25,
  height:25,
  borderRadius:25,
  color:'#ffffff', 
  fontSize:'1.5rem',
});

export default function CustomAvatar({
  name,
  className,
  style
}:{
  name:string;
  className?:string;
  style?:CSSProperties
}){
  const first = name.charAt(0);
  return (
    <StyledAvatar style={style} className={className}>{first}</StyledAvatar>
  )
}