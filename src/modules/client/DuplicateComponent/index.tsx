import { ReactNode } from "react";

export default function DuplicateComponent({
  times,
  children,
}:{
  times?:number,
  children:ReactNode
}){
  const _times = (times && times > 0 && times <= 10) ? times : 2;
  const components:ReactNode[] = new Array(_times);

  for(let i = 0; i < _times; i++){
    components.push(children);
  }

  return (
    <>
      {components}
    </>
  );
}