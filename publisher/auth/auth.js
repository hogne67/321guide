// auth.js – for tilgangskontroll og utlogging

import { auth, db, signOut } from "../firebase-init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

/**
 * Sjekker tilgangsnivået (rolle) til en bruker basert på UID.
 * Returnerer f.eks. "admin", "editor", "viewer" eller "guest".
 */
export async function checkAccessLevel(uid) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return data.role || "guest";
    } else {
      return "guest";
    }
  } catch (error) {
    console.error("Feil ved henting av rolle:", error);
    return "guest";
  }
}

/**
 * Logger ut brukeren og sender tilbake til login-siden.
 */
export function loggUt() {
  signOut(auth)
    .then(() => {
      window.location.href = "../auth/login.html";
    })
    .catch((error) => {
      console.error("Feil ved utlogging:", error);
    });
}
