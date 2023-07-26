
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDc6zeSrPpVNXZxhFBP7GzrQ0noo_WQv7Q",
    authDomain: "news-app-83937.firebaseapp.com",
    projectId: "news-app-83937",
    storageBucket: "news-app-83937.appspot.com",
    messagingSenderId: "810533844188",
    appId: "1:810533844188:web:2877b1aaf61aec5ba4b019",
    measurementId: "G-HLS7DEHS51"
  };

  const firebaseApp = initializeApp(firebaseConfig);

 const auth = getAuth(firebaseApp);
 const db = getFirestore(firebaseApp)
 export { auth , db};

