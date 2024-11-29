import { Dispatch, useState, SetStateAction } from "react";

export default function useQuery<T>(dispatch:Dispatch<SetStateAction<T>>){
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null); 

  const query = (url:string, options?:RequestInit) => {
    setPending(true);
    setError(null);
    fetch(
      url,
      options
    ).then((res) => (
      res.json()
    )).then((data) => {
      dispatch(data);
    }).catch((e) => {
      setError(e);
    }).finally(() => {
      setPending(false)
    });
  }
  return [isPending, query, error] as const;
}
