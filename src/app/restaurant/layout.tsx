import { ReactNode } from "react";
import Breadcrumb from "@/modules/client/Breadcrumb";

export default function Layout({children}:{children:ReactNode}){
  const breadcrumb = [{
    link:'/',
    name:'主頁'
  },
  {
    link:'/restaurant',
    name:'餐廳'
  }];
  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      {children}
    </div>
  )
}