import { ReactNode } from "react";
import Breadcrumb from "@/modules/client/Breadcrumb";

export default function Layout({children}:{children:ReactNode}){
  const breadcrumb = [{
    link:'/',
    name:'主頁'
  },
  {
    link:'/hiking',
    name:'行山'
  }];

  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      {children}
    </div>
  )
}