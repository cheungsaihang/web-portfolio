import { css } from "@pigment-css/react";
import Link from "next/link";
import { ReactNode } from "react";

const cssCard = css(({theme}) => ({
  display:'block',
  position:'relative',
  width:'100%',
  color:theme.vars.colors.foreground,
}));

export default function Card({
  href,
  children
}:{
  href?:string,
  children:ReactNode
}){
  return (
    <>
      {
        href 
        ? <Link href={href} className={cssCard}>{children}</Link>
        : <div className={cssCard}>{children}</div>
      }
    </>
  );
}