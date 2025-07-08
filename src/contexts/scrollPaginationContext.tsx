import { createContext, ReactNode } from "react";
import createExternalStore, { ExternalStore, Subscribe } from "@/hooks/createExternalStore";

type Store<T> = {
  list:T[] | null;
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
    initalList:T[] | null;
    isMorePage:boolean;
    onEndReached:OnEndReached<T>;
    children:ReactNode;
  }) => {

    const subscribe = scrollSubscribe<T>(props.onEndReached);

    const store = createExternalStore<Store<T>>({
      list:props.initalList,
      page:1,
      isMorePage:props.isMorePage,
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
    //Add Window Scroll Listener
    window.addEventListener("scroll", () => {
      if(!isEndReached()){
        return ;
      }
      const controller = stateController(getState,setState);
      if(controller.isLoadAvailable()){
        //Do end reached process
        controller.setLoading();
        onEndReached(controller.getNextPage()).then((data) => {
          controller.update(data);
        }); 
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    }
  }
  return subscribe;
}


function stateController<T>(
  getState:() => Store<T>, 
  setState:(state:Store<T>) => void
){
  const currentState = getState();

  const isLoadAvailable = () => currentState.isMorePage && !currentState.isPending;

  const setLoading = () => setState({ ...currentState, isPending:true });

  const getNextPage = () => currentState.page + 1;
  
  const update = (data:NextFetchData<T> | null) => {
    const latestState = getState();
    if(!data){
      setState({ ...latestState, isPending:false});
      return ;
    }
    const newList = latestState.list ? latestState.list.concat(data.newList) : data.newList;
    setState({
      list:newList,
      isPending:false, 
      page:data.currentPage, 
      isMorePage:data.haveMore
    });    
  }

  return {
    isLoadAvailable,
    setLoading,
    update,
    getNextPage
  }
}

function isEndReached(_threshold?:number){
  const threshold = _threshold ? _threshold : 5;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const totalScolled = scrollTop + clientHeight;
  const tiggleHeight = scrollHeight - threshold;
  return totalScolled >= tiggleHeight;
}