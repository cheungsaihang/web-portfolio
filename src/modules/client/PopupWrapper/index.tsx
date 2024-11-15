"use client"
import { styled, css } from "@pigment-css/react";
import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Wrapper = styled('div')({
  position:'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:'rgba(0,0,0,.8)',
  display:'flex',
  zIndex:2001,
  justifyContent:'center',
  alignItems:'center'
});

const CloseDiv = styled('div')({
  position:'fixed',
  top:5,
  right:5,
  zIndex:2002
});

const cssIcon = css(({theme}) => ({
  fontSize:`2.5rem !important`,
  color: theme.colors.icon
}));

type WrapperHooks = {
  showWrapper:boolean,
  setShowWrapper:Dispatch<SetStateAction<boolean>>,
}

export function usePopupWrapper():WrapperHooks{
  const [showWrapper, setShowWrapper] = useState(false); 
  return {
    showWrapper: showWrapper,
    setShowWrapper: setShowWrapper
  };
}

export function PopupWrapper({children, control }:{children:ReactNode, control: WrapperHooks}){
  const closePopup = () => control.setShowWrapper(false);
  return(
    <>
    {
      control.showWrapper ? (
        <Wrapper>
          <CloseDiv><CloseIcon className={cssIcon} onClick={closePopup} /></CloseDiv>
          {children}
        </Wrapper>
      ) : null
    }
    </>
  );
}