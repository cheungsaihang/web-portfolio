import { FC, ReactNode } from 'react'
import { styled, StyledComponent} from "@pigment-css/react";

type MainProps = {
  children:ReactNode;
  className?:string;
}

interface IMain extends FC<MainProps> {
  Header:StyledComponent;
  Body:StyledComponent;
}

const Container = styled('div')(({theme}) => ({
  width:'100%',
  marginLeft:200,
  backgroundColor:theme.vars.colors.background,
  [`@media (max-width: ${theme.media.screenS})`]:{
    marginLeft:0,
  }
}));

const Header = styled('div')(({theme}) => ({
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  height:50,
  padding:'0 .5rem',
  [`@media (max-width: ${theme.media.screenS})`]:{
    position:'fixed',
    left:0,
    right:0,
    backgroundColor:theme.colors.menuBackground,
    borderBottomColor:theme.colors.layoutBorder,
    borderBottomStyle:'solid',
    borderBottomWidth:1,
    boxShadow:'none',
    zIndex:1001
  }
}));

const Body = styled('main')(({theme}) => ({
  padding:theme.sizes.spacing.mainInner,
  paddingTop:25,
  [`@media (max-width: ${theme.media.screenS})`]:{
    marginTop:51,
  }
}));

const Main = ({children,className}:MainProps) => ( <Container className={className}>{children}</Container>);
Main.Header = Header;
Main.Body = Body;
export default Main satisfies IMain;