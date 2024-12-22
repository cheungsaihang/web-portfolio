"use client"
import { createContext, useContext } from "react";
import { API_UsersSchema } from "@/types/api/users";

type TAuthUserContextProvider = {
  authUser:API_UsersSchema | null
}

const AuthUserContext = createContext<TAuthUserContextProvider | null>(null);

export default function AuthUserContextProvider({authUser,children}:{authUser:API_UsersSchema | null, children:React.ReactNode}){
  return (
      <AuthUserContext.Provider value={{ authUser:authUser}}>
          {children}
      </AuthUserContext.Provider>
  );
}

export function useAuthUserContext(){
    const context = useContext(AuthUserContext);
    if(context === undefined){
        throw new Error("useAuthUserContext must be used within a AuthUserContextProvider");
    }
    return context;
}