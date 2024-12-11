"use client"
import { useSyncExternalStore } from "react";

type Rerender = () => void;
type Cleanup = () => void;

export type ExternalStore<T> = {
  useExternalStore: () => T;
  setState: (state:T) => void;
  getState: () => T;
};

export type Subscribe<T> = (getState:() => T, setState:(state:T) => void) => Cleanup;

export default function createExternalStore<T>(initialState: T, _subscribe?:Subscribe<T>) {
  let currentState = initialState;
  
  const serverState:T = initialState;
  const listeners = new Set<Rerender>();

  const subscribe = (rerender:Rerender) => {
    listeners.add(rerender);
    const cleanup = _subscribe && _subscribe(getSnapspot, setCurrentState);
    return () => {
      cleanup && cleanup();
      listeners.delete(rerender);
    }
  };
  const getSnapspot = () => currentState;
  const getServerSnapshot = () => currentState ?? serverState;

  const setCurrentState = (state:T) => {
    currentState = state;
    listeners.forEach((rerender) => rerender());
  }
  return {
    useExternalStore: () => { return useSyncExternalStore(subscribe,getSnapspot,getServerSnapshot); },  
    setState: setCurrentState,
    getState: getSnapspot
  }
}