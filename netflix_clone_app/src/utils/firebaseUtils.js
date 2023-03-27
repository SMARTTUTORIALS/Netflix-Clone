import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//from version 9.0.0 and above firebase has modular imports as shown above

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-e17cc.firebaseapp.com",
  projectId: "netflix-clone-e17cc",
  storageBucket: "netflix-clone-e17cc.appspot.com",
  messagingSenderId: "410576503966",
  appId: "1:410576503966:web:848899f0e3f747d961a78f",
  measurementId: "G-38K6Q2JKMX"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();


  export { auth };
  export default db;