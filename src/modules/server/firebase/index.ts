import { isFBSuccess } from './handler';
import { getFSDocs, getFSDocById, getFSQuery, DocConverter, FsOrder, setFSDocById, addFSDoc, deleteFSDocById, fsWhere } from "@/modules/server/firebase/services/db";
import { getImageUrl } from "@/modules/server/firebase/services/storage";
import { prepareWhereCondition, WhereParams } from "./util";
import { PAGINATION_LIMIT } from "@/constants";
import firebaseApp from "@/modules/server/firebase/app";

export type QueryCondition = {
  search?:WhereParams,
  order?:FsOrder,
  page?:number,
  limit?:number
};

export const prepareQuery = (
  collectionId:string,
  condition?:QueryCondition
) => {
  const where = prepareWhereCondition(condition?.search);
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
    if(!isFBSuccess(res) || res.data.empty){
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
    if(!isFBSuccess(res)){
      return null;
    }
    if(!res.data.exists()){
      return null;
    }
    return res.data;
  }
}

export const prepareAddDoc = (
  collectionId:string, 
  docData:object,
) => {
  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await addFSDoc(firebaseApp)(collectionId,docData,converter);
    return isFBSuccess(res);
  }
}

export const prepareSetDoc = (
  collectionId:string, 
  docId:string,
  docData:object,
) => {
  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await setFSDocById(firebaseApp)(collectionId,docId,docData,converter);
    return isFBSuccess(res);
  }
}

export const prepareDeleteDocs = (
  collectionId:string,
  condition:{
    docId?:string,
    queries?:{
      [key:string]:string
    }
  }
) => {
  if(condition.docId){
    const docId = condition.docId;
    return async () => {
      const res = await deleteFSDocById(firebaseApp)(collectionId,docId);
      return isFBSuccess(res);
    }
  }
  if(condition.queries){
    const where = Object.entries(condition.queries).map(query => {
      const [ key, value ] = query;
      return fsWhere.equal(key,value);
    });
    return async () => {
      const query = getFSQuery(firebaseApp)(collectionId, {
        where:where      
      });
      const docsRes = await getFSDocs(query)();
      if(!isFBSuccess(docsRes) || docsRes.data.empty){
        return null;
      }
      const deletedDocs = await Promise.all(docsRes.data.docs.map(async(doc) => {
          const docId = doc.id;
          const res = await deleteFSDocById(firebaseApp)(collectionId,docId);
          return isFBSuccess(res);
      }));
      return deletedDocs.filter(success => success);
    }
  }
  throw Error ('Delete docs function requires either docId or queries in condition object');
}

export const prepareGetImageUrl  = () => getImageUrl(firebaseApp);