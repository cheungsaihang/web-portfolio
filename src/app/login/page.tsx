"use client"
import { css } from "@pigment-css/react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import * as L from "@/modules/client/StyledComponent/Login";

const cssInput = css({
  fontSize:'1.5rem',
  borderWidth:0,
  width:'calc(100% - 6px)'
});

export default function Page() {
  const [state, loginAction] = useActionState(login,undefined);

  return ( 
    <L.Container>
        <L.Frame>
          <form action={loginAction}>
            <L.Form>
                <L.Field>
                  <L.Label>電郵</L.Label>
                  <L.Input><input type='text' className={cssInput} name='email' /></L.Input>
                  <L.Error>{state?.error.email && state.error.email}</L.Error>
                </L.Field>
                <L.Field>
                  <L.Label>密碼</L.Label>
                  <L.Input><input type='password' className={cssInput} name='password' /></L.Input>
                  <L.Error>{state?.error.password && state.error.password}</L.Error>
                </L.Field>
                <LoginButton />
                <L.Error center>{state?.error.formSubmit && state?.error.formSubmit}</L.Error>
            </L.Form>
          </form>
        </L.Frame>
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