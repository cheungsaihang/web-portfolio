"use client"
import { css } from "@pigment-css/react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import * as L from "@/modules/client/StyledComponent/Login";
import { useSearchParams } from "next/navigation";

const cssInput = css(({theme}) =>({
  fontSize:'1.5rem',
  borderWidth:0,
  width:'calc(100% - 6px)',
  backgroundColor:theme.vars.colors.background,
  color:theme.vars.colors.foreground
}));

export default function Page() {
  const [state, loginAction] = useActionState(login,undefined);
  const searchParams = useSearchParams();
  const referer = searchParams.get('referer');

  if(state?.success){
    //To tiggle useEffect without any dependencies
    //Using hard redirect instead of redirect function in 'next/navigation'
    window.location.href = referer ? referer : '/';
    return null;
  }

  return ( 
    <L.Container>
        <L.Frame>
          <form action={loginAction}>
            <L.Form>
                <L.Field>
                  <L.Label>電郵</L.Label>
                  <L.Input><input type='text' className={cssInput} name='email' /></L.Input>
                  <L.Error>{state?.error?.email && state.error.email}</L.Error>
                </L.Field>
                <L.Field>
                  <L.Label>密碼</L.Label>
                  <L.Input><input type='password' className={cssInput} name='password' /></L.Input>
                  <L.Error>{state?.error?.password && state.error.password}</L.Error>
                </L.Field>
                <LoginButton />
                <L.Error center>{state?.error?.formSubmit && state?.error.formSubmit}</L.Error>
            </L.Form>
          </form>
        </L.Frame>
        <L.Info>
          <L.Field><L.InfoText>試玩帳戶：</L.InfoText></L.Field>
          <L.InfoText>visitor@test.com</L.InfoText>
          <L.InfoText>visitor123</L.InfoText>
        </L.Info>
    </L.Container>
  );
}

function LoginButton(){
  const { pending } = useFormStatus();
  return (
    <L.ButtonWrap>
      <L.Button type="submit" disabled={pending}>{ pending ? '登入中...' : '登入' }</L.Button>
    </L.ButtonWrap>
  )
}