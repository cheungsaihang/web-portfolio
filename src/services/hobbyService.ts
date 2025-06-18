import { Hobby } from "@/types";

export function isValidHobby(hobby:string):hobby is Hobby{
  return hobby == "restaurant" || hobby == "hiking";
}


