import { usePopupWrapper } from "@/modules/client/PopupWrapper";
import { useRef } from "react";

export function usePopupGallery(){
  const picState = useRef<number>(0);
  const wrapperControl = usePopupWrapper();
  
  const showPopup = (picIndex:number) => {
    picState.current = picIndex;
    wrapperControl.setShowWrapper(true);
  }

  return { 
    picState, 
    wrapperControl, 
    showPopup 
  } as const;
}