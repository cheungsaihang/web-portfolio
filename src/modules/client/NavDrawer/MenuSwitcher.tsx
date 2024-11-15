import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { css } from "@pigment-css/react";

const cssMenuIcon = css(({theme}) => ({
  fontSize:`${theme.sizes.fonts.icon} !important`,
  color: theme.colors.icon,
  display:'none !important',
  marginRight:5,
  [`@media (max-width: ${theme.media.screenS})`]:{
    display:'block !important'
  },
}));

export default function ThemeSwitcher({
  isOpen,
  setOpen,
}:{
  isOpen:boolean,
  setOpen:(isOpen:boolean) => void,
}){
  return (
    <div>
    {
      isOpen ? (
        <CloseIcon className={cssMenuIcon} onClick={() => setOpen(!isOpen)} /> 
      ) : (
        <MenuIcon className={cssMenuIcon} onClick={() => setOpen(!isOpen)} />
      )  
    }
    </div>
  );
}