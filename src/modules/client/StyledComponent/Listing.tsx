import { styled } from "@pigment-css/react";

const TitleWrap = styled('div')({
  height:40,
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
});

const Title = styled('h3')(({theme}) => ({
  fontSize:theme.sizes.fonts.gridTitle,
  lineHeight:theme.sizes.fonts.gridTitle,
  textAlign:'center',
  color:theme.vars.colors.foreground,
}));

const Styled = {
  TitleWrap,
  Title
};

export default Styled