import { styled } from "@pigment-css/react";

const StyledListing = styled('div')({
  textAlign:'center',
  fontSize:'1.6rem',
  paddingTop:'18rem',
});

export const NoDataListing = () => (
  <StyledListing>未有相關資料</StyledListing>
)