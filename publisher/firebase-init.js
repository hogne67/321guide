// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// publisher/firebase-init.js
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "guide-a370b.firebaseapp.com",
  projectId: "guide-a370b",
  storageBucket: "guide-a370b.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx"
};

export default firebaseConfig;


// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };
