import { useState } from "react";

export default function useQuery(){
  const [isPending, setPending] = useState(false);

  const query = async (url:string, options?:RequestInit) => {
    setPending(true);
    return await fetch(
      url,
      options
    ).then((res) => {
      return res.json()
    }).catch((e) => {
      throw new Error(e);
    }).finally(() => {
      setPending(false);
    });
  }
  return [isPending, query] as const;
}
