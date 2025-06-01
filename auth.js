import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from './firebase-init.js';
import { doc, getDoc } from 'firebase/firestore';
export const auth = getAuth(app);
export async function checkAccess(allowedRoles) {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async user => {
      if (!user) {
        window.location.href = "login.html";
        return reject("Ikke logget inn");
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.exists() ? snap.data().role : null;
      if (allowedRoles.includes(role)) {
        resolve({ user, role });
      } else {
        alert("Du har ikke tilgang til denne siden.");
        window.location.href = "login.html";
        reject("Ingen tilgang");
      }
    });
  });
}

export function loggUt() {
  signOut(auth).then(() => window.location.href = "login.html");
}
