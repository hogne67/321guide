import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { app } from "../firebase-init.js";

// Initialiser Firebase-tjenester
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Funksjon for å sjekke brukerens rolle
export function checkAccess(allowedRoles = []) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Du må være logget inn for å få tilgang.");
      window.location.href = "../auth/login.html";
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (!userData || !allowedRoles.includes(userData.role)) {
        alert("Du har ikke tilgang til denne siden.");
        window.location.href = "../auth/login.html";
      }
    } catch (error) {
      console.error("Feil ved tilgangssjekk:", error);
      alert("Noe gikk galt. Prøv igjen senere.");
      window.location.href = "../auth/login.html";
    }
  });
}

// 🧠 Valgfritt: Eksporter auth og user-info hvis du vil bruke det andre steder
export { auth, db, signInWithPopup, signOut, GoogleAuthProvider };

