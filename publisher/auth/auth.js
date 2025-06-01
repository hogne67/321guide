import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import { app } from "../firebase-init.js";

const auth = getAuth(app);
const db = getFirestore(app);

// 👉 Google-innlogging
export async function loggInnMedGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const bruker = result.user;

    // Lagre bruker i Firestore hvis ny
    const brukerRef = doc(db, "users", bruker.uid);
    const snapshot = await getDoc(brukerRef);

    if (!snapshot.exists()) {
      await setDoc(brukerRef, {
        navn: bruker.displayName,
        epost: bruker.email,
        role: "editor", // default-rolle
        opprettet: new Date()
      });
    }

    alert("Logget inn som: " + bruker.displayName);
    window.location.href = "../admin/admin-all-routes.html"; // eller ønsket side
  } catch (error) {
    console.error("Innlogging feilet:", error);
    alert("Innlogging feilet: " + error.message);
  }
}

// 👉 Utlogging
export async function loggUt() {
  await signOut(auth);
  alert("Du er logget ut");
  window.location.href = "../../index.html"; // eller ønsket side
}

// 👉 Sjekk tilgang og rolle
export async function checkAccess(allowedRoles = ["admin", "editor"]) {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Du må logge inn først.");
        window.location.href = "../../auth/login.html";
        return reject("Ikke logget inn");
      }

      const docRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        alert("Brukeren finnes ikke i databasen.");
        return reject("Bruker mangler i Firestore");
      }

      const data = snapshot.data();
      if (!allowedRoles.includes(data.role)) {
        alert("Du har ikke tilgang til denne siden.");
        window.location.href = "../../auth/login.html";
        return reject("Tilgang nektet");
      }

      resolve(user);
    });
  });
}
