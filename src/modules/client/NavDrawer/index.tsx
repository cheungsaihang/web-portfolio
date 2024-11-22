"use client"
import { ReactNode, useState } from "react";
import { styled } from "@pigment-css/react";
import Drawer from "./Drawer";
import Main from "./Main";
import ThemeSwitcher from '@/modules/client/ThemeSwitcher';
import MenuSwitcher from './MenuSwitcher';
import Image from "next/image";

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

export default function NavRrawer({ children }:{ children:ReactNode}){
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <Layout>
      <Drawer open={isMenuOpen}>
        <Drawer.Header />
        <Drawer.List>
          <Drawer.Item><a href="/">主頁</a></Drawer.Item>
          <Drawer.Item><a href="/restaurant">餐廳</a></Drawer.Item>
          <Drawer.Item><a href="/hiking">行山</a></Drawer.Item>
        </Drawer.List>
      </Drawer>
      <Main>
        <Main.Header>
          <MenuSwitcher isOpen={isMenuOpen} setOpen={setMenuOpen} />
          <LogoContainer><Image src={'/images/logo.gif'} fill alt={'Logo'}/></LogoContainer>
          <ThemeSwitcher />
        </Main.Header>
        <Main.Body>{children}</Main.Body>
      </Main>
    </Layout>
  );
}