"use client"
import { API_UsersSchema } from "@/types/api/users";
import { css } from "@pigment-css/react";
import * as P from "@/modules/client/StyledComponent/Profile";

const cssButton = css(({theme}) => ({
  display:'block',
  fontSize:'1.5rem',
  color:theme.colors.foreground,
  backgroundColor:theme.colors.skeleton,
  width:100,
  textAlign:'center',
  paddingTop:5,
  paddingBottom:5,
  borderRadius:5,
}));


export default function Main({user}:{user:API_UsersSchema | null}) {
  const initalUser = { firstname:'', lastname:'', email:''};
  const { firstname, lastname, email } = user || initalUser;
  return ( 
    <P.Container>
      <P.Frame>
      <P.Row>
        <P.Label>名稱:</P.Label>
        <P.Value>{`${firstname} ${lastname}`}</P.Value>
      </P.Row>
      <P.Row>
        <P.Label>電郵:</P.Label>
        <P.Value>{email}</P.Value>
      </P.Row>
      <P.Row>
        <P.Label />
        <P.Value><a href='/logout' className={cssButton}>登出</a></P.Value>
      </P.Row>    
      </P.Frame>  
    </P.Container>
  );
}