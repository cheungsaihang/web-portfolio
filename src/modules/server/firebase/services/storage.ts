import { getDownloadURL, ref, getStorage } from 'firebase/storage';
import { firebaseHandler, isFBSuccess } from '../handler';
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
  const res =  await firebaseHandler<StorageError,StorageData>(getDownloadURL,ref(storage, path));
  if(!isFBSuccess(res)){
    return undefined;
  }
  return res.data;
}