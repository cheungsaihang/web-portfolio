import { setItem, getItem } from "@/utils/localStorage";
import { useLayoutEffect, useState } from "react";

export default function usePersistState<T extends string>(key:string, initialValue:T){
  const [value, setValue] = useState<string>(initialValue);

  //Use client function with SSR 
  useLayoutEffect(() => {
    const item = getItem(key);
    if(item && item != initialValue){
      setValue(item);
    }
  },[]);

  const setPersistValue = (value:string) => {
    setValue(value);
    setItem(key,value);
  }
  return [value, setPersistValue] as const;
}
