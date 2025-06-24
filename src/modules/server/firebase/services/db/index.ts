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
  Query,
  setDoc,
  deleteDoc,
  addDoc,
  DocumentReference
} from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { invoke } from '../../rpc';
import { FS_OrderConditions, FS_WhereConditions, fsOrder, fsPagination, fsWhere } from './utils';



export type DocResponse = DocumentSnapshot<DocumentData,DocumentData>;
export type QueryRequest = Query<DocumentData, DocumentData>;
export type QueryResponse = QuerySnapshot<unknown,DocumentData>;
export type FSError = unknown;

//Interfaces
export interface DocConverter<T extends object>{
  toFirestore:(data: T) => DocumentData,
  fromFirestore:(snapshot: QueryDocumentSnapshot,options: SnapshotOptions) => T 
};

export const prepareFSQuery = (app:FirebaseApp) => 
  (
    collectionId:string,
    condition?:{
      where?:FS_WhereConditions[], 
      order?:FS_OrderConditions[],
      page?:number,
      length?:number
    } 
  ) => {
  const db = getFirestore(app);
  const ref = collection(db,collectionId);
  const wheres = !condition?.where ? [] : condition.where.map((item) => fsWhere(item));
  const orders = !condition?.order ? [] : condition.order.map((item) => fsOrder(item));
  const pagination = fsPagination({page:condition?.page, length:condition?.length})
  const conditions = [...wheres, ...orders, ...pagination].filter(c => (c !== undefined));
  
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
  return await invoke<FSError,QueryResponse>(getDocs,ref);
};

export const getFSDocById = (app:FirebaseApp) => async<C extends object>(
  collectionId:string, 
  docId:string, 
  converter?:DocConverter<C>
) => {
  const db = getFirestore(app);
  const ref = converter ? doc(db,collectionId,docId).withConverter(converter) : doc(db,collectionId,docId);
  return await invoke<FSError,DocResponse>(getDoc,ref);
};

export const addFSDoc = (app:FirebaseApp) => async<C extends object>(
  collectionId:string, 
  docData:object,
  converter?:DocConverter<C>
) => {
  const db = getFirestore(app);
  const ref = converter ? collection(db,collectionId).withConverter(converter) : collection(db,collectionId);
  return await invoke<FSError,DocumentReference>(addDoc,ref,docData);
};

export const setFSDocById = (app:FirebaseApp) => async<C extends object>(
  collectionId:string,
  docId:string,
  docData:object,
  converter?:DocConverter<C>
) => {
  const db = getFirestore(app);
  const ref = converter ? doc(collection(db,collectionId),docId).withConverter(converter) : doc(collection(db,collectionId),docId);
  return await invoke<FSError,DocResponse>(setDoc,ref,docData);
};

export const deleteFSDocById = (app:FirebaseApp) => async(
  collectionId:string,
  docId:string,
) => {
  const db = getFirestore(app);
  const ref = doc(collection(db,collectionId),docId);
  return await invoke<FSError,DocResponse>(deleteDoc,ref);  
};