import { decodeAccessToken } from "./actions";
import useInitialEffect from "@/hooks/useInitialEffect";
import AccountIcon from "./AccountIcon";
import ThemeSwitcher from "@/modules/client/ThemeSwitcher";
import { SkeletionView } from "@/modules/client//Skeleton";

export default function Controller({onClick}:{onClick?:() => void}){
  const [isReady, decodedData] = useInitialEffect(decodeAccessToken,undefined);
  return (
    <>
      {
        isReady ? (
          <>
            <ThemeSwitcher />
            <AccountIcon email={decodedData?.email} onClick={onClick}/>
          </>
        ) : (
          <>
            <SkeletionView width={25} height={25} rounded style={{display:'inline-block',marginRight:10}} />
            <SkeletionView width={25} height={25} rounded style={{display:'inline-block'}} />
          </>
        )
      }
    </>
  )
}