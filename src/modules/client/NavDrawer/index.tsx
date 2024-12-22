"use client"
import { ReactNode, useState } from "react";
import { styled } from "@pigment-css/react";
import Drawer from "./Drawer";
import Main from "./Main";
import ThemeSwitcher from '@/modules/client/ThemeSwitcher';
import MenuSwitcher from './MenuSwitcher';
import Image from "next/image";
import AccountIcon from "./AccountIcon";

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
          <Wrap>
            <MenuSwitcher isOpen={isMenuOpen} setOpen={setMenuOpen} />
          </Wrap>
          <LogoContainer><Image src={'/images/logo.gif'} fill alt={'Logo'}/></LogoContainer>
          <Wrap>
            <ThemeSwitcher />
            <AccountIcon />
          </Wrap>
        </Main.Header>
        <Main.Body>{children}</Main.Body>
      </Main>
    </Layout>
  );
}