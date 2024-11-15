import { styled, css } from "@pigment-css/react";
import Link from "next/link";
import { ReactNode } from "react";

export const TitleWrap = styled('div')({
  height:40,
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
});

export const Title = styled('h3')(({theme}) => ({
  fontSize:theme.sizes.fonts.gridTitle,
  lineHeight:theme.sizes.fonts.gridTitle,
  textAlign:'center',
  color:theme.vars.colors.foreground,
}));

export const Card = ({href,children}:{href?:string,children:ReactNode}) => {
  const cssCard = css(({theme}) => ({
    display:'block',
    position:'relative',
    width:'100%',
    color:theme.vars.colors.foreground,
  }));
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

