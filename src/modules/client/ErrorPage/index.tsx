import { styled } from "@pigment-css/react";

const StyledError = styled('div')({
  textAlign:'center',
  fontSize:'1.6rem',
  paddingTop:'18rem',
});

export default function ErrorPage(){
  return <StyledError>系統發生錯誤，請稍候在試</StyledError>
}