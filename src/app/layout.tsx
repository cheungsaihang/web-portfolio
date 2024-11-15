import type { Metadata } from "next";
import '@/globalCss';
import NavRrawer from "@/modules/client/NavDrawer";

export const metadata: Metadata = {
  title: "Hang's Blog",
  description: "分享寫這個Blog的心路歷程和一些個人的生活體驗",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html dir="ltr" lang="zh">
        <head>
          <script src="/js/theme.js"></script>
        </head>
        <body>
          <NavRrawer>{children}</NavRrawer>
        </body>
      </html>
  );
}
