
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-89eee.firebaseapp.com",
  projectId: "ai-short-video-generator-89eee",
  storageBucket: "ai-short-video-generator-89eee.firebasestorage.app",
  messagingSenderId: "394341296022",
  appId: "1:394341296022:web:e9c078b84146d80dd5dfb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const  storage = getStorage(app);