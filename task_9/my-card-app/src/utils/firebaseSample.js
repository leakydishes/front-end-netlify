import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

// Add config info
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase

const provider = new GoogleAuthProvider(); // Instance of Google Provider
    provider.setCustomParameters ({
        prompt:"select_account"
    });

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);