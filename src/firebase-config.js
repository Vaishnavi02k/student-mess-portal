// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCcCa2-jVQLDQlSuXZeFAuswyNx_c_N7b4",
  authDomain: "hostel-mess-8ba8a.firebaseapp.com",
  projectId: "hostel-mess-8ba8a",
  storageBucket: "hostel-mess-8ba8a.firebasestorage.app",
  messagingSenderId: "1088097622877",
  appId: "1:1088097622877:web:7c10afbe3248d7118fe6b4",
  measurementId: "G-0P9M8T426Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
