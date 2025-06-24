import { isFBSuccess } from './rpc';
import { 
  getFSDocs, 
  getFSDocById, 
  DocConverter, 
  setFSDocById, 
  addFSDoc, 
  deleteFSDocById, 
  prepareFSQuery,
} from "@/modules/server/firebase/services/db";
import { ArgImageUrl, getImageUrl } from "@/modules/server/firebase/services/storage";
import firebaseApp from "@/modules/server/firebase/app";
import { FS_OrderConditions, FS_WhereConditions } from './services/db/utils';

export type FS_QueryCondition = {
  where?:FS_WhereConditions[],
  order?:FS_OrderConditions[],
  page?:number,
  length?:number
};

const queryDocs = (
  collectionId:string,
  condition?:FS_QueryCondition
) => {
  const query = prepareFSQuery(firebaseApp)(collectionId, condition);
  
  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await getFSDocs(query)(converter);
    if(!isFBSuccess(res) || res.data.empty){
      return null;
    }
    return res.data;
  }
}

const getDoc = (
  collectionId:string, 
  docId:string
) => {
  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await getFSDocById(firebaseApp)(collectionId,docId,converter);
    if(!isFBSuccess(res) || !res.data.exists()){
      return null;
    }
    return res.data;
  }
}

const addDoc = (
  collectionId:string, 
  docData:object,
) => {
  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await addFSDoc(firebaseApp)(collectionId,docData,converter);

    if(isFBSuccess(res)){
      return {
        success:true,
        docId:res.data.id
      }
    }
    return {
      success:false
    };
  }
}

const setDoc = (
  collectionId:string, 
  docId:string,
  docData:object,
) => {
  return async <C extends object>(converter?:DocConverter<C>) => {
    const res = await setFSDocById(firebaseApp)(collectionId,docId,docData,converter);
    return isFBSuccess(res);
  }
}

export const deleteDocs = (
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
    const wheres = Object.entries(condition.queries).map(query => {
      const [ key, value ] = query;
      return { condition:'equal', field:key, keyword:value } satisfies FS_WhereConditions
    }).filter(item => item != undefined);

    if(wheres.length <= 0){
      return async () => [];
    }
    return async () => {
      const query = prepareFSQuery(firebaseApp)(collectionId, {
        where:wheres   
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

const getImage  = async (arg:ArgImageUrl) => {
  return await getImageUrl(firebaseApp)(arg);
}

export const db = {
  queryDocs: queryDocs,
  getDoc: getDoc,
  addDoc: addDoc,
  setDoc: setDoc,
  deleteDocs: deleteDocs,
}

export const storage = {
  getImage: getImage
}