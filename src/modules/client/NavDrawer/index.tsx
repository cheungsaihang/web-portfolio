"use client"
import { MouseEventHandler, ReactNode, useState, useTransition } from "react";
import { styled } from "@pigment-css/react";
import Drawer from "./Drawer";
import Main from "./Main";
import MenuSwitcher from './MenuSwitcher';
import Image from "next/image";
import Controller from "./Controller";
import Loading from "@/app/hiking/loading";
import { usePathname, useRouter } from "next/navigation";

const Layout = styled('div')(({theme})=> ({
  display:'flex',
  alignItems:'stretch',
  minHeight:'100vh',
  paddingBottom: 20,
  backgroundColor: theme.vars.colors.background,
  margin:'0px auto',
  maxWidth:1920
}));

const LogoContainer = styled('div')({
  borderRadius:25,
  overflow:'hidden',
  width:40,
  height:40,
  position:'relative'
});

const Wrap = styled('div')({
  display:'flex',
  justifyContent:'space-between',
  width:60
});

const Shadow = styled('div')<{ show?: boolean }>({
  display: ({show}) => show ? 'block' : 'none',
  position:'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:'rgba(0,0,0,.6)',
  zIndex:1001,
});

export default function NavRrawer({ children }:{ children:ReactNode }){
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const closeMenu = () => setMenuOpen(false);
  const onMenuClick:MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if(pathname != e.currentTarget.href){
      if(['/restaurant','/hiking'].includes(e.currentTarget.href)){
        startTransition(()=>{
          router.push(e.currentTarget.href);
        });
      }
      else{
        router.push(e.currentTarget.href);
      }
    }
    closeMenu();
  }
  return (
    <Layout>
      <Shadow show={isMenuOpen} onClick={closeMenu}/>
      <Drawer open={isMenuOpen}>
        <Drawer.Header />
        <Drawer.List>
          <Drawer.Item><a href="/" onClick={onMenuClick}>主頁</a></Drawer.Item>
          <Drawer.Item><a href="/restaurant" onClick={onMenuClick}>餐廳</a></Drawer.Item>
          <Drawer.Item><a href="/hiking" onClick={onMenuClick}>行山</a></Drawer.Item>
        </Drawer.List>
      </Drawer>
      <Main>
        <Main.Header>
          <Wrap>
            <MenuSwitcher isOpen={isMenuOpen} setOpen={setMenuOpen} />
          </Wrap>
          <LogoContainer><Image src={'/images/logo.gif'} fill alt={'Logo'}/></LogoContainer>
          <Wrap>
            <Controller onClick={closeMenu}/>
          </Wrap>
        </Main.Header>
        <Main.Body>{isPending ? <Loading /> : children}</Main.Body>
      </Main>
    </Layout>
  );
}