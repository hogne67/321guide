import { db } from "../firebase-init.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import { checkAccess, loggUt } from "../auth/auth.js";

// Sjekk om bruker har tilgang før noe vises
checkAccess(["admin", "editor"]);

const table = document.getElementById("routesTable");

// Funksjon: Gå til redigeringsside
function redigerPOI(routeId, poiId) {
  window.location.href = `admin-poi.html?routeId=${routeId}&poiId=${poiId}`;
}

// Funksjon: Slett et POI
async function slettPOI(routeId, poiId) {
  if (!confirm("Er du sikker på at du vil slette dette POI-et?")) return;
  await deleteDoc(doc(db, `routes/${routeId}/pois/${poiId}`));
  alert("POI slettet");
  location.reload();
}

// Last inn alle ruter og deres POI
async function hentAllePOI() {
  const routesSnap = await getDocs(collection(db, "routes"));
  for (const routeDoc of routesSnap.docs) {
    const routeId = routeDoc.id;
    const routeData = routeDoc.data();

    const poisSnap = await getDocs(collection(db, `routes/${routeId}/pois`));
    poisSnap.forEach(poiDoc => {
      const poi = poiDoc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${poi.title || "(Uten tittel)"}</td>
        <td>${routeData.name || routeId}</td>
        <td>${poi.status || "Aktiv"}</td>
        <td>
          <button onclick="redigerPOI('${routeId}', '${poiDoc.id}')">✏️</button>
          <button onclick="slettPOI('${routeId}', '${poiDoc.id}')">🗑️</button>
        </td>
      `;
      table.appendChild(tr);
    });
  }
}

window.redigerPOI = redigerPOI;
window.slettPOI = slettPOI;

hentAllePOI();
