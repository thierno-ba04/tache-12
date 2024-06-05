// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCCXjFG-eOypliTwZRw31mzXGAIJWihKY",
  authDomain: "auth-tache-12.firebaseapp.com",
  projectId: "auth-tache-12",
  storageBucket: "auth-tache-12.appspot.com",
  messagingSenderId: "316476755278",
  appId: "1:316476755278:web:5b7988ae6fed5c406ea21f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);