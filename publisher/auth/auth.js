import { auth, onAuthStateChanged, signOut } from "../firebase-init.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const db = getFirestore();

async function checkAccess(allowedRoles = []) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "../auth/login.html";
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("Du har ikke tilgang (ingen brukerdata).");
      window.location.href = "../auth/login.html";
      return;
    }

    const data = userSnap.data();
    if (!allowedRoles.includes(data.role)) {
      alert("Du har ikke tilgang til denne siden.");
      window.location.href = "../auth/login.html";
    }
  });
}

function loggUt() {
  signOut(auth)
    .then(() => {
      window.location.href = "../auth/login.html";
    })
    .catch((error) => {
      console.error("Feil ved utlogging:", error);
    });
}

export { checkAccess, loggUt };
