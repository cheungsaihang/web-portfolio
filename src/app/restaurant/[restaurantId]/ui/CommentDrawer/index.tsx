import { useState, useImperativeHandle, MutableRefObject, useEffect } from "react";
import RightDrawer from "@/modules/client/RightDrawer";
import CommentForm from "./form";
import CommentListing from "./listing";
import { getComments } from "@/services/commentService";
import { Hobby } from "@/types";
import { API_Comments } from "@/types/api/comments";
import { API_UsersSchema } from "@/types/api/users";
import { CommentContext } from "./context";

export type CommentDrawerRef = {
  openDrawer: () => void;
} | null;

export default function CommentDrawer({
  ref,
  type,
  docId,
  userProfile,
}:{
  ref:MutableRefObject<CommentDrawerRef>;
  type:Hobby;
  docId:string;
  userProfile?:API_UsersSchema | null;
}){
  const [open,setOpen] = useState(false);
  const [isReady, setReady] = useState(false);
  const [comments, setComments] = useState<API_Comments[]>([]);

  useImperativeHandle(ref, () => {
    return {
      openDrawer: () => setOpen(true),
    };
  }, []);

  useEffect(() => {
    if(isReady || !open){
      return ;
    }
    getComments({ type, docId }).then(item => {
      if(item?.records){
        setComments(item.records)
      }
    }).finally(() => setReady(true))
    
  },[open, isReady]);

  return (
    <RightDrawer stateOpen={open} stateSetOpen={setOpen} >
      <CommentContext.Provider 
        value={{
          type,
          docId,
          userProfile,
          setComments
        }}
      >
        <CommentForm />
        <CommentListing isReady={isReady} comments={comments} />
      </CommentContext.Provider>
    </RightDrawer>
  );
}