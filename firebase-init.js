// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// 🔐 Dine egne firebase-verdier (de du sendte meg)
const firebaseConfig = {
  apiKey: "AIzaSyCAPpamFocyVPlGnTl-mDBLxDDdNmLK4Xk",
  authDomain: "pois-75b5f.firebaseapp.com",
  projectId: "pois-75b5f",
  storageBucket: "pois-75b5f.firebasestorage.app",
  messagingSenderId: "255931335310",
  appId: "1:255931335310:web:491d5eb8d484574962ffdf"
};

// 🚀 Start tilkobling
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };
