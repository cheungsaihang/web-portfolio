import { 
  getFirestore, 
  collection, 
  QuerySnapshot, 
  DocumentData, 
  QueryDocumentSnapshot, 
  SnapshotOptions, 
  getDocs,
  getDoc,
  doc, 
  DocumentSnapshot
} from 'firebase/firestore';
import { apiHandler } from '@/utils/api';
import MyFirebaseApp from '../app.class';

//Configs and Types
const app = MyFirebaseApp.getApp();
const db = getFirestore(app);

type DocData = DocumentSnapshot<DocumentData,DocumentData>
type QueryData = QuerySnapshot<unknown,DocumentData>;
type QueryError = unknown;

//Interfaces
export interface DocConverter<T extends object>{
  toFirestore:(data: T) => DocumentData,
  fromFirestore:(snapshot: QueryDocumentSnapshot,options: SnapshotOptions) => T 
};

//Functions
export const getFSDocs = async <C extends object>(collectionId:string, converter?:DocConverter<C>) => {
  const ref = converter ? collection(db,collectionId).withConverter(converter) : collection(db,collectionId);
  return await apiHandler<QueryError,QueryData>(getDocs,ref);
};

export const getFSDocById = async <C extends object>(collectionId:string, docId:string, converter?:DocConverter<C>) => {
  const ref = converter ? doc(db,collectionId,docId).withConverter(converter) : doc(db,collectionId,docId);
  return await apiHandler<QueryError,DocData>(getDoc,ref);
};
