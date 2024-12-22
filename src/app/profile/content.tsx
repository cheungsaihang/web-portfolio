"use client"
import { useAuthUserContext } from "@/contexts/useAuthContext";
import { css, styled } from "@pigment-css/react";

const Container = styled('div')({
  marginTop:10,
  display:'flex',
  justifyContent:'center',
});
const Frame = styled('div')(({theme}) => ({
  padding:20,
  borderWidth:1,
  borderColor:theme.colors.skeleton,
  borderStyle:'solid',
  borderRadius:10,
}));
const Row = styled('div')({
  display:'flex',  
  paddingTop:10,
  paddingBottom:10,
});
const Label = styled('div')(({theme}) => ({
  fontSize:'1.5rem',
  color:theme.vars.colors.foreground,
  width:100,
  textAlign:'center',
  fontWeight:'bolder',
}));
const Value = styled('div')(({theme}) => ({
  fontSize:'1.5rem',
  color:theme.vars.colors.foreground,
  width:200,
}));

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


export default function ProfileContent() {
  const authConext = useAuthUserContext();
  const initalUser = { firstname:'', lastname:'', email:''};
  const { firstname, lastname, email } = authConext?.authUser || initalUser;
  return ( 
    <Container>
      <Frame>
      <Row>
        <Label>名稱:</Label>
        <Value>{`${firstname} ${lastname}`}</Value>
      </Row>
      <Row>
        <Label>電郵:</Label>
        <Value>{email}</Value>
      </Row>
      <Row>
        <Label />
        <Value><a href='/logout' className={cssButton}>登出</a></Value>
      </Row>    
      </Frame>  
    </Container>
  );
}