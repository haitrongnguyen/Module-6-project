// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_xvBUva5WjcsQoAYiyXOJx2l3fr97JTI",
    authDomain: "shop-app-dccde.firebaseapp.com",
    projectId: "shop-app-dccde",
    storageBucket: "shop-app-dccde.appspot.com",
    messagingSenderId: "627572831458",
    appId: "1:627572831458:web:21fac30c5aafee03021abb",
    measurementId: "G-PCZVYBHQKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);