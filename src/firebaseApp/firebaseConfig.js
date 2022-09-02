import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEx7MHUEsVs_wUbSBaOdveE-xIu_b0eWI",
  authDomain: "monkey-blogging-17e2f.firebaseapp.com",
  projectId: "monkey-blogging-17e2f",
  storageBucket: "monkey-blogging-17e2f.appspot.com",
  messagingSenderId: "730975062157",
  appId: "1:730975062157:web:0f9043a30182e590e0fac4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
