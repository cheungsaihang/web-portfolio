import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import MyFirebaseApp from '../app.class';
import { apiHandler, isApiSuccess } from '@/utils/api';

const app = MyFirebaseApp.getApp();
const storage = getStorage(app);

type ArgImageUrls = {
  docType:string;
  docId:string;
  docPic:string;
};

export type StorageData = string;
export type StorageError = unknown;

export async function getImageUrl(arg:ArgImageUrls){
  const { docType, docId, docPic } = arg;
  const path = `/images/${docType}/${docId}/${docPic}`;
  const res =  await apiHandler<StorageError,StorageData>(getDownloadURL,ref(storage, path));
  if(!isApiSuccess(res)){
    return undefined;
  }
  return res.data;
}