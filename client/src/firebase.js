// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6bd1d.firebaseapp.com",
  projectId: "mern-blog-6bd1d",
  storageBucket: "mern-blog-6bd1d.appspot.com",
  messagingSenderId: "220280423328",
  appId: "1:220280423328:web:7001b18e923ca3de629ac5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
