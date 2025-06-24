import { MouseEventHandler } from 'react';
import { usePathname, useRouter } from "next/navigation";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { css, styled } from "@pigment-css/react";

const cssAccountIcon = css(({theme}) => ({
  fontSize:`${theme.sizes.fonts.icon} !important`,
  color: theme.colors.icon,
}));

const AvatarCircle = styled('div')({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#ff6666',
  width:25,
  height:25,
  borderRadius:25,
  color:'#ffffff', 
  fontSize:'1.5rem'
})

export default function AccountIcon({email,onClick}:{email?:string,onClick?:() => void}){
  const router = useRouter();
  const pathname = usePathname();
  const onLinkClick:MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if(pathname != e.currentTarget.href){
      router.push(e.currentTarget.href);
    }
    if(typeof onClick === 'function'){
      onClick();
    }
  }
  return ( 
    <>
      {
        email ? (
          <a href={'/profile'} onClick={onLinkClick} ><Avatar email={email}/></a>
        ) : (
          <a href={'/login'} onClick={onLinkClick} ><AccountCircleIcon className={cssAccountIcon}  /></a>
        )
      }
    </>
  );
}

function Avatar({email}:{email:string}){
  const first = email.charAt(0).toUpperCase();
  return (<AvatarCircle>{first}</AvatarCircle>);
}