// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_URI,
    authDomain: "blogy-cf1e1.firebaseapp.com",
    projectId: "blogy-cf1e1",
    storageBucket: "blogy-cf1e1.firebasestorage.app",
    messagingSenderId: "644021886347",
    appId: "1:644021886347:web:89fc6231f193812426238e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);