
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4JuKPs7fXKN1MEZprZdVLGUfO6HVjx7o",
  authDomain: "ai-short-video-generator-3632a.firebaseapp.com",
  projectId: "ai-short-video-generator-3632a",
  storageBucket: "ai-short-video-generator-3632a.firebasestorage.app",
  messagingSenderId: "279695935788",
  appId: "1:279695935788:web:61975eb8ea5f0149f5c489",
  measurementId: "G-950VBTJMQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  storage = getStorage(app);