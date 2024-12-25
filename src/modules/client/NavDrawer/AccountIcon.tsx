import { useAuthUserContext } from '@/contexts/useAuthContext';
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

export default function AccountIcon(){
  const authContext = useAuthUserContext();
  const email = authContext?.authUser?.email;
  return ( 
    <>
      {
        email ? (
          <a href={'/profile'} ><Avatar email={email}/></a>
        ) : (
          <a href={'/login'} ><AccountCircleIcon className={cssAccountIcon}  /></a>
        )
      }
    </>
  );
}

function Avatar({email}:{email:string}){
  const first = email.charAt(0);
  return (<AvatarCircle>{first}</AvatarCircle>);
}