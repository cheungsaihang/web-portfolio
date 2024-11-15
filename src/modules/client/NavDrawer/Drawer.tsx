import { FC, ReactNode } from 'react'
import { styled, StyledComponent} from "@pigment-css/react";

type DrawerProps = {
  children:ReactNode;
  className?:string;
}

interface IDrawer extends FC<DrawerProps> {
  Header:StyledComponent;
  List:StyledComponent;
  Item:StyledComponent;
}

const Nav = styled('nav')(({ theme }) => ({
  position:'fixed',
  backgroundColor:theme.colors.menuBackground,
  width:200,
  top:0,
  bottom:0,
  [`@media (max-width: ${theme.media.screenS})`]:{
    position:'fixed',
    top:51,
    width:'100%',
    left:'-100%',
    transition:'left .15s linear',
    zIndex:1002
  }
}));

const Drawer = ({children,className}:DrawerProps) => ( <Nav className={className}>{children}</Nav>);
Drawer.Header = styled('div')({margin:".5rem"});
Drawer.List = styled('ul')({});
Drawer.Item = styled('li')(({theme}) => ({
  ['a']: {
    display:'block',
    color:theme.vars.colors.drawerLink,
    padding:10,
    marginBottom:10,
    fontSize:'1.6rem'
  },
  ['a:hover']:{
    backgroundColor:'rgba(255,255,255,0.2)'
  }
}));

export default Drawer satisfies IDrawer;