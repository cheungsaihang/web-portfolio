import { isApiSuccess } from "@/utils/api";
import FirebaseApp from "@/modules/server/firebase/app";
import { getFSDocs, getFSDocById, getFSQuery, fsWhere, DocConverter } from "@/modules/server/firebase/services/db";
import { getImageUrl } from "@/modules/server/firebase/services/storage";

const firebaseApp = FirebaseApp.getApp();

export type CollectionType = "hiking" | "restaurant";
type Search = {[key:string]:string | null} | undefined;

export const isValidCollection = (collectionId:string): collectionId is CollectionType => {
  return collectionId == 'hiking' || collectionId == 'restaurant';
}

export const prepareQuery = (
  collectionId:string,
  search?:Search,
) => {
  const where = search?.tags ? fsWhere.inArray('tags',search.tags) : undefined;
  const query = getFSQuery(firebaseApp)(collectionId, where);

  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await getFSDocs(query)(converter);
    if(!isApiSuccess(res)){
      return null;
    }
    return res.data;
  }
}

export const prepareGetDoc = (
  collectionId:string, 
  docId:string
) => {
  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await getFSDocById(firebaseApp)(collectionId,docId,converter);
    if(!isApiSuccess(res)){
      return null;
    }
    return res.data;
  }
}

export const prepareGetImageUrl  = () => getImageUrl(firebaseApp);