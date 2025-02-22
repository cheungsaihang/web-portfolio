import { FC, ReactNode } from 'react'
import { styled, StyledComponent} from "@pigment-css/react";

type DrawerProps = {
  children:ReactNode;
  open?:boolean;
}

interface IDrawer extends FC<DrawerProps> {
  Header:StyledComponent;
  List:StyledComponent;
  Item:StyledComponent;
}

const StyledNav = styled('nav')(({ theme }) => ({
  position:'fixed',
  backgroundColor:theme.colors.menuBackground,
  width:200,
  top:0,
  bottom:0,
  [`@media (max-width: ${theme.media.screenS})`]:{
    position:'fixed',
    top:51,
    left: ({open}:{open?:boolean}) => (open ? 0 : -200),
    transition:'left .15s linear',
    zIndex:1002
  }
}));
const StyledHeader = styled('div')({margin:".5rem"});
const StyledList = styled('ul')({});
const StyledItem = styled('li')(({theme}) => ({
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

const Drawer:IDrawer = ({children,open}) => <StyledNav open={open}>{children}</StyledNav>;
Drawer.Header = StyledHeader;
Drawer.List = StyledList;
Drawer.Item = StyledItem;

export default Drawer;