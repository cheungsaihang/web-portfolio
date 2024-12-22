import { useAuthUserContext } from '@/contexts/useAuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { css, styled } from "@pigment-css/react";
import Link from 'next/link';

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

export default function AccountIcon(){
  const authContext = useAuthUserContext();
  const email = authContext?.authUser?.email;
  return ( 
    <>
      {
        email ? (
          <Link href={'/profile'} ><Avatar email={email}/></Link>
        ) : (
          <Link href={'/login'} ><AccountCircleIcon className={cssAccountIcon}  /></Link>
        )
      }
    </>
  );
}

function Avatar({email}:{email:string}){
  const first = email.charAt(0);
  return (<AvatarCircle>{first}</AvatarCircle>);
}