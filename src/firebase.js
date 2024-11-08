// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAol_9p6BRIGK0QMl4zOAXTuDopf3_Tyys",
  authDomain: "serpenttrail.firebaseapp.com",
  projectId: "serpenttrail",
  storageBucket: "serpenttrail.appspot.com",
  messagingSenderId: "895126829380",
  appId: "1:895126829380:web:1e2af531cd850025087f11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const messaging = getMessaging(app);

export { db, messaging };