"use client"
import { createContext, SetStateAction, useContext } from "react";
import { Hobby } from "@/types";
import { API_UsersSchema } from "@/types/api/users";
import { API_Comments } from "@/types/api/comments";

type Context = {
  docId:string;
  type:Hobby
  userProfile?:API_UsersSchema | null;
  setComments:(comments:SetStateAction<API_Comments[]>) => void;
}

export const CommentContext = createContext<Context | null>(null);

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if(!context){
    throw new Error("Comment Context must be used inside of the Comment Provider");
  }
  return context;
}