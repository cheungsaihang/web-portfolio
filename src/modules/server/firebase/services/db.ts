import { 
  collection, 
  QuerySnapshot, 
  DocumentData, 
  QueryDocumentSnapshot, 
  SnapshotOptions, 
  getDocs,
  getDoc,
  doc, 
  DocumentSnapshot,
  getFirestore,
  query,
  where,
  Query,
  QueryFieldFilterConstraint,
  orderBy,
  limit,
  startAt
} from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { apiHandler } from '@/utils/api';

export type DocResponse = DocumentSnapshot<DocumentData,DocumentData>;
export type QueryRequest = Query<DocumentData, DocumentData>;
export type QueryResponse = QuerySnapshot<unknown,DocumentData>;
export type FSError = unknown;

//Interfaces
export interface DocConverter<T extends object>{
  toFirestore:(data: T) => DocumentData,
  fromFirestore:(snapshot: QueryDocumentSnapshot,options: SnapshotOptions) => T 
};

type FSWhere = {
  [key:string]:(field:string, keyword:string) => QueryFieldFilterConstraint
}

export type FsOrder = [
  string, 'asc' | 'desc'
][] | string[];

export const fsWhere:FSWhere = {
  inArray: (field, keyword) => where(field ,'array-contains',keyword)
}

export const getFSQuery = (app:FirebaseApp) => 
  (
    collectionId:string,
    condition:{
      where?:QueryFieldFilterConstraint, 
      order?:FsOrder,
      offset:number,
      limit:number
    } 
  ) => {
  const db = getFirestore(app);
  const ref = collection(db,collectionId);
  
  const orderFns = !condition?.order ? [] : condition.order.map((item => {
    if(typeof item === 'string'){
      return orderBy(item);
    }
    return orderBy(...item);
  }));

  const conditions = [condition.where, ...orderFns, startAt(condition.offset), limit(condition.limit)].filter(c => (c !== undefined));

  if(!conditions.length){
    return ref;
  }
  return query(ref,...conditions);
}

//Functions
export const getFSDocs = (q:QueryRequest) =>  async<C extends object>(
  converter?:DocConverter<C>
) => {
  const ref = converter ? q.withConverter(converter) : q;
  return await apiHandler<FSError,QueryResponse>(getDocs,ref);
};

export const getFSDocById = (app:FirebaseApp) => async<C extends object>(
  collectionId:string, 
  docId:string, 
  converter?:DocConverter<C>
) => {
  const db = getFirestore(app);
  const ref = converter ? doc(db,collectionId,docId).withConverter(converter) : doc(db,collectionId,docId);
  return await apiHandler<FSError,DocResponse>(getDoc,ref);
};