// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDlAz9Pi-9Peeue4VQSIupqgygDg8NmFmg",
    authDomain: "todo-97409.firebaseapp.com",
    projectId: "todo-97409",
    storageBucket: "todo-97409.firebasestorage.app",
    messagingSenderId: "874327120089",
    appId: "1:874327120089:web:fe1c0d02ac3ee05d2e86c8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
