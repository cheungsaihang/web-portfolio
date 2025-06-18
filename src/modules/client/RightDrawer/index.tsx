"use client"
import { ReactNode } from "react";
import { styled, css } from "@pigment-css/react";
import CloseIcon from '@mui/icons-material/Close';

const Shadow = styled('div')<{ show?: boolean }>({
  display: ({show}) => show ? 'block' : 'none',
  position:'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:'rgba(0,0,0,.6)',
  zIndex:2001,
});

const StyledNav = styled('div')({
  position:'fixed',
  backgroundColor:'#ffffff',
  paddingBottom:15,
  width:250,
  top:0,
  bottom:0,
  right: ({open}:{open?:boolean}) => (open ? 0 : -250),
  zIndex: 2002,
  transition:'right .15s linear',
});

const StyledHeader = styled('div')(({theme}) => ({
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  padding:5,
  marginBottom:10,
  borderBottomWidth:.7,
  borderBottomColor:theme.colors.breadcrumb,
  borderBottomStyle:'solid'
}));

const StyledTitle = styled('div')(({theme})=> ({
  fontSize:'2rem',
  color:theme.colors.tagText,
}));

const cssCloseIcon = css(({theme}) => ({
  color:theme.colors.icon,
  fontSize:`${theme.sizes.fonts.iconSmaller} !important`
}));

export default function RightDrawer({
  stateOpen,
  stateSetOpen,
  children,
}:{
  stateOpen:boolean;
  stateSetOpen: (open:boolean) => void;
  children:ReactNode;
}){
  return (
    <>
      <Shadow show={stateOpen} onClick={() => stateSetOpen(false)} />
      <StyledNav open={stateOpen}>
        <StyledHeader>
          <StyledTitle>留言</StyledTitle>
          <CloseIcon className={cssCloseIcon} onClick={() => stateSetOpen(false)} />
        </StyledHeader>
        {children}
      </StyledNav>
    </>
  );
}