// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_pErZ_L9qOTwmrsicbB8aU1c1LkkokqU",
  authDomain: "realestate-30875.firebaseapp.com",
  projectId: "realestate-30875",
  storageBucket: "realestate-30875.firebasestorage.app",
  messagingSenderId: "427523869365",
  appId: "1:427523869365:web:569c9e014a926294320cfc",
  measurementId: "G-HHJX74J8GE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
