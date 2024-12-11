import { createContext, ReactNode } from "react";
import createExternalStore, { ExternalStore, Subscribe } from "@/hooks/createExternalStore";

type Store<T> = {
  list:T[];
  page:number;
  isMorePage:boolean;
  isPending:boolean;
}

type Context<T> = {
  store:ExternalStore<Store<T>>;
}

type NextFetchData<T> = {
  newList:T[];
  haveMore:boolean;
  currentPage:number;
};

export type OnEndReached<T> = (nextPage:number) => Promise<NextFetchData<T> | null>;

export default function createScrollPaginationContext<T>(){
  const Context = createContext<Context<T> | null>(null);

  const Provider = (props:{
    initalList:T[];
    initalMore:boolean;
    onEndReached:OnEndReached<T>;
    children:ReactNode;
  }) => {

    const subscribe = scrollSubscribe<T>(props.onEndReached);

    const store = createExternalStore<Store<T>>({
      list:props.initalList,
      page:1,
      isMorePage:props.initalMore,
      isPending:false,
    },subscribe);

    return (
      <Context.Provider value={{
        store:store
      }}>
        {props.children}
      </Context.Provider>
    );
  }
  return [ Context, Provider ] as const;
}

function scrollSubscribe<T>(onEndReached:OnEndReached<T>){
  const subscribe: Subscribe<Store<T>> = (getState,setState) => {
    //Prepare functions
    const isLoadAvailable = () => {
      const currentState = getState();
      return currentState.isMorePage && !currentState.isPending;
    } 
    const stateLoading = () => {
      setState({ ...getState(),isPending:true });
    }
    const stateUpdate = (data:NextFetchData<T> | null) => {
      const currentState = getState();
      let newState = { ...currentState, isPending:false }
      if(data){
        newState = {list:[...currentState.list, ...data.newList], isPending:false, page:data.currentPage, isMorePage:data.haveMore}
      }
      setState(newState);
    }
    //Add Window Scroll Listener
    window.addEventListener("scroll", () => {
      const currentState = getState();
      const nextPage= currentState.page + 1;

      if(!isLoadAvailable() || !isEndReached()){
        return ;
      }
      //Loading state
      stateLoading();
      onEndReached(nextPage).then((data) => {
        stateUpdate(data);
      }); 
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    }
  }
  return subscribe;
}

function isEndReached(_threshold?:number){
  const threshold = _threshold ? _threshold : 5;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const totalScolled = scrollTop + clientHeight;
  const tiggleHeight = scrollHeight - threshold;
  return totalScolled >= tiggleHeight;
}