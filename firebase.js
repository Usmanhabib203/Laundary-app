
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4fhKoUyBqVe9h3t2IAjYCm4MUM5xCbLY",
  authDomain: "database-6c48b.firebaseapp.com",
  projectId: "database-6c48b",
  storageBucket: "database-6c48b.appspot.com",
  messagingSenderId: "862437283220",
  appId: "1:862437283220:web:168a6a164a0981e2a2ab81"
};


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore();

export {auth,db};