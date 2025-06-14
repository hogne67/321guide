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
  apiKey: "AIzaSyAuERwFxQsdSAUdBMbcKBmwtrYlTFQNp4U",
  authDomain: "guide-a370b.firebaseapp.com",
  projectId: "guide-a370b",
  storageBucket: "guide-a370b.firebasestorage.app",
  messagingSenderId: "xxx",
  appId: "1:549286938289:web:8c2140e3995143388a0490"
};

export default firebaseConfig;


// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };
