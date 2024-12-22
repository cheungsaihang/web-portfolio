import { fsWhere } from "@/modules/server/firebase/services/db";
import { QueryFieldFilterConstraint } from "firebase/firestore";

export type WhereParams = {[key:string]:string | null} | undefined;

export type CollectionType = "hiking" | "restaurant";

export const isValidCollection = (collectionId:string): collectionId is CollectionType => {
  return collectionId == 'hiking' || collectionId == 'restaurant';
}

export const prepareWhereCondition = (search:WhereParams):QueryFieldFilterConstraint[] => {
  if(search){
    const searchArr = Object.entries(search).map(item => {
      const [key, value] = item;
      if(key && value){
        if(key == 'tags'){
          return fsWhere.inArray(key,value);
        }
        if(key == 'email'){
          return fsWhere.equal(key,value)
        }
      }
      return undefined;
    });
    return searchArr.filter(item => item != undefined);
  }
  return [];
}
