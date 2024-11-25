import { initializeApp, FirebaseApp } from 'firebase/app';
import firebaseConfig from './config';

class FIREBASE_APP {
  private static instance: FIREBASE_APP;
  private app:FirebaseApp;
  private constructor() {
    this.app = initializeApp(firebaseConfig);
  }
  static getApp(): FirebaseApp {
    if (!FIREBASE_APP.instance) {   
      FIREBASE_APP.instance = new FIREBASE_APP();
    }
    return FIREBASE_APP.instance.app;
  }
}
export default FIREBASE_APP;
