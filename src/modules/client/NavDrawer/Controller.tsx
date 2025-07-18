import { decodeAccessToken } from "./actions";
import useInitialEffect from "@/hooks/useInitialEffect";
import AccountIcon from "./AccountIcon";
import ThemeSwitcher from "@/modules/client/ThemeSwitcher";
import { SkeletionView } from "@/modules/client//Skeleton";
import className from "./css";

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
            <SkeletionView width={25} height={25} rounded className={`${className.inlineBlock} ${className.mr_s}`} />
            <SkeletionView width={25} height={25} rounded className={className.mr_s} />
          </>
        )
      }
    </>
  )
}