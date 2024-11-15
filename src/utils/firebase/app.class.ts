import { initializeApp, FirebaseApp } from 'firebase/app';
import firebaseConfig from './config';

class MyFirebaseApp {
  private static instance: MyFirebaseApp;
  private app:FirebaseApp;
  private constructor() {
    this.app = initializeApp(firebaseConfig);
  }
  static getApp(): FirebaseApp {
    if (!MyFirebaseApp.instance) {   
      MyFirebaseApp.instance = new MyFirebaseApp();
    }
    return MyFirebaseApp.instance.app;
  }
}
export default MyFirebaseApp;
