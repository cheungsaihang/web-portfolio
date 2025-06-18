import { useState, useEffect } from "react";

type InitialEffect<T> = {
  isEffected:boolean;
  effectedData:T | null;
}

export default function useInitialEffect<T,P>(promiseFunction:(params:P) => Promise<T>, params:P){
  const [data, setData] = useState<InitialEffect<T>>({
    isEffected:false,
    effectedData:null
  });
  useEffect(() => {
    promiseFunction(params).then((res) => {
      setData({
        isEffected:true,
        effectedData:res
      })
    });
  },[]);
  return [data.isEffected, data.effectedData] as const;
}
