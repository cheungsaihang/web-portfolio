import type { Metadata } from "next";
import { WEBSITE_NAME } from "@/constants";
import { Noto_Sans_HK } from "next/font/google";
import AuthUserContextProvider from "@/contexts/useAuthContext";
import NavRrawer from "@/modules/client/NavDrawer";
import { sessionCookies } from "@/utils/sesstion";
import { API_UsersSchema } from "@/types/api/users";
import { API_Error, API_Success } from "@/types/api";
import { isErrorResponse } from "@/utils/nextResponse";
import '@/globalCss';

export const metadata: Metadata = {
  title: WEBSITE_NAME,
  description: "分享寫這個Blog的心路歷程和一些個人的生活體驗",
};

const font = Noto_Sans_HK({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [accessToken] = (await sessionCookies()).get();
  const authUser = accessToken ? await getUser(accessToken) : null;

  return (
      <html dir="ltr" lang="zh" className={font.className}  suppressHydrationWarning>
        <head>
          <script src="/js/theme.js"></script>
        </head>
        <AuthUserContextProvider authUser={authUser}>
          <body>
            <NavRrawer>{children}</NavRrawer>
          </body>
        </AuthUserContextProvider>
      </html>
  );
}

async function getUser(accessToken:string) {
  const res = await fetch(process.env.API_ENDPOINT  + '/api/user', {
    method: 'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${accessToken}`
    }, 
    cache: 'no-store'
  });
  const body = await res.json() as API_Success<API_UsersSchema> | API_Error;
  if(isErrorResponse(body)){
    return null;
  }
  return body.result;
}