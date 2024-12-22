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
  startAt,
  setDoc,
  deleteDoc,
  addDoc
} from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { firebaseHandler } from '../handler';
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
  inArray: (field, keyword) => where(field ,'array-contains',keyword),
  equal: (field, keyword) => where(field ,'==',keyword)
}

export const getFSQuery = (app:FirebaseApp) => 
  (
    collectionId:string,
    condition:{
      where?:QueryFieldFilterConstraint[], 
      order?:FsOrder,
      offset?:number,
      limit?:number
    } 
  ) => {
  const db = getFirestore(app);
  const ref = collection(db,collectionId);
  const whereFns = condition?.where ? condition.where : [];
  const orderFns = !condition?.order ? [] : condition.order.map((item => {
    if(typeof item === 'string'){
      return orderBy(item);
    }
    return orderBy(...item);
  }));
  const startAtFn = (condition?.offset && condition?.limit && condition.limit > 1) ? startAt(condition.offset) : undefined;
  const limitFn = condition?.limit ? limit(condition.limit) : undefined;
  const conditions = [...whereFns, ...orderFns, startAtFn, limitFn].filter(c => (c !== undefined));
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
  return await firebaseHandler<FSError,QueryResponse>(getDocs,ref);
};

export const getFSDocById = (app:FirebaseApp) => async<C extends object>(
  collectionId:string, 
  docId:string, 
  converter?:DocConverter<C>
) => {
  const db = getFirestore(app);
  const ref = converter ? doc(db,collectionId,docId).withConverter(converter) : doc(db,collectionId,docId);
  return await firebaseHandler<FSError,DocResponse>(getDoc,ref);
};

export const addFSDoc = (app:FirebaseApp) => async<C extends object>(
  collectionId:string, 
  docData:object,
  converter?:DocConverter<C>
) => {
  const db = getFirestore(app);
  const ref = converter ? collection(db,collectionId).withConverter(converter) : collection(db,collectionId);
  return await firebaseHandler<FSError,DocResponse>(addDoc,ref,docData);
};

export const setFSDocById = (app:FirebaseApp) => async<C extends object>(
  collectionId:string,
  docId:string,
  docData:object,
  converter?:DocConverter<C>
) => {
  const db = getFirestore(app);
  const ref = converter ? doc(collection(db,collectionId),docId).withConverter(converter) : doc(collection(db,collectionId),docId);
  return await firebaseHandler<FSError,DocResponse>(setDoc,ref,docData);
};

export const deleteFSDocById = (app:FirebaseApp) => async(
  collectionId:string,
  docId:string,
) => {
  const db = getFirestore(app);
  const ref = doc(collection(db,collectionId),docId);
  return await firebaseHandler<FSError,DocResponse>(deleteDoc,ref);  
};