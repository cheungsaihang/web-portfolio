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
  QueryFieldFilterConstraint
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

export const fsWhere:FSWhere = {
  inArray: (field, keyword) => where(field ,'array-contains',keyword)
}

export const getFSQuery = (app:FirebaseApp) => (collectionId:string, filter?:QueryFieldFilterConstraint) => {
  const db = getFirestore(app);
  const ref = collection(db,collectionId);
  if(!filter){
    return ref;
  }
  return query(ref, filter);
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