// Importing Firebase Modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Storage

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkvaBeKu_-aqp65PHeg-8Dsnfd0q57YZM",
  authDomain: "job-portal-dc024.firebaseapp.com",
  projectId: "job-portal-dc024",
  storageBucket: "job-portal-dc024.firebasestorage.app",
  messagingSenderId: "575293272600",
  appId: "1:575293272600:web:a5d2f9f99913805385c96d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firebase Firestore database instance
const db = getFirestore(app);

const storage = getStorage(app); // ✅ Initialize Storage

// Export auth and db forn use in other components
export { auth, db, storage };
