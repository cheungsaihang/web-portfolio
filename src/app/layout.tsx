import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import '@/globalCss';
import NavRrawer from "@/modules/client/NavDrawer";
import { Noto_Sans_HK } from "next/font/google";

export const metadata: Metadata = {
  title: WEBSITE_NAME,
  description: "分享寫這個Blog的心路歷程和一些個人的生活體驗",
};

const font = Noto_Sans_HK({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html dir="ltr" lang="zh" className={font.className}  suppressHydrationWarning>
        <head>
          <script src="/js/theme.js"></script>
        </head>
        <body>
          <NavRrawer>{children}</NavRrawer>
        </body>
      </html>
  );
}
