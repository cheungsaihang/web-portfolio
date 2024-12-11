import { isApiSuccess } from "@/utils/api";
import FirebaseApp from "@/modules/server/firebase/app";
import { getFSDocs, getFSDocById, getFSQuery, fsWhere, DocConverter, FsOrder } from "@/modules/server/firebase/services/db";
import { getImageUrl } from "@/modules/server/firebase/services/storage";
import { PAGINATION_LIMIT } from "@/constants";

const firebaseApp = FirebaseApp.getApp();


type Search = {[key:string]:string | null} | undefined;
export type CollectionType = "hiking" | "restaurant";
export type QueryCondition = {
  search?:Search,
  order?:FsOrder,
  page?:number,
  limit?:number
};

export const isValidCollection = (collectionId:string): collectionId is CollectionType => {
  return collectionId == 'hiking' || collectionId == 'restaurant';
}

export const prepareQuery = (
  collectionId:string,
  condition?:QueryCondition
) => {
  const where = condition?.search?.tags ? fsWhere.inArray('tags',condition.search.tags) : undefined;
  const _page = (condition?.page && condition.page > 0) ? (condition.page - 1) : 0;
  const _offset = (_page * PAGINATION_LIMIT) + 1;
  const _limit = condition?.limit ? condition.limit : PAGINATION_LIMIT;

  const query = getFSQuery(firebaseApp)(collectionId, {
    where:where,
    order:condition?.order,
    offset:_offset,
    limit:_limit
  });

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