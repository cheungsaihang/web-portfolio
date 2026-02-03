import { styled, css } from "@pigment-css/react";

const Article = styled('article')(({ theme }) => ({
  fontSize:'14px',
  display:'block',
  color: theme.vars.colors.foreground
}));

export default async function Home() {
  return (
    <Article>
        <p className={css`padding:100px 20px; text-align:center`}>因為部分服務將改為收費，網頁會暫停更新。</p>
    </Article>
  );
}

export const dynamic = 'force-static';