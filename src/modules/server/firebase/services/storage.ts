import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { apiHandler, isApiSuccess } from '@/utils/api';
import { FirebaseApp } from 'firebase/app';

export type ArgImageUrl = {
  docType:string;
  docId:string;
  docPic:string;
};

export type StorageData = string;
export type StorageError = unknown;

export const getImageUrl = (app:FirebaseApp) => async (arg:ArgImageUrl) => {
  const storage = getStorage(app);
  const { docType, docId, docPic } = arg;
  const path = `/images/${docType}/${docId}/${docPic}`;
  const res =  await apiHandler<StorageError,StorageData>(getDownloadURL,ref(storage, path));
  if(!isApiSuccess(res)){
    return undefined;
  }
  return res.data;
}