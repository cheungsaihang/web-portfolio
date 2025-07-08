import { Hobby } from "@/types";

export function isStringNumber(number:string | null):number is string{
  if(number && typeof number === 'string'){
    const pattern = /[^0-9]/;
    return !pattern.test(number);
  }
  return false;
}

export function isServer(){
  return typeof window === 'undefined';
}

export function isServerBuild(){
  return process?.env?.npm_lifecycle_event == 'build' && process?.env?.NODE_ENV != 'development';
}

export function isValidHobby(hobby:string):hobby is Hobby{
  return hobby == "restaurant" || hobby == "hiking";
}