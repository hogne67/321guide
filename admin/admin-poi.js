import { db, storage } from './firebase-init.js';
import {
  doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const params = new URLSearchParams(location.search);
const routeId = params.get("routeId");
const poiId = params.get("poiId");
const isNew = !poiId;

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const languageInput = document.getElementById("language");
const activeSwitch = document.getElementById("active");
const imageInput = document.getElementById("image");
const audioInput = document.getElementById("audio");

let imageUrl = "", audioUrl = "", centerLatLng = null;

const titleCount = document.getElementById("titleCount");
const descCount = document.getElementById("descCount");

titleInput.addEventListener("input", () => {
  titleCount.textContent = `${titleInput.value.length}/40`;
});

descriptionInput.addEventListener("input", () => {
  const text = descriptionInput.value;
  const words = text.trim().split(/\s+/).filter(w => w);
  descCount.textContent = `${text.length} tegn / ${words.length} ord`;
});

const map = L.map('map').setView([63.4, 10.4], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let drawnItem = null;
const drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    rectangle: false,
    circle: true,
    marker: false,
    circlemarker: false,
    polygon: {
      shapeOptions: { color: 'blue' }
    }
  },
  edit: { featureGroup: new L.FeatureGroup() }
});
map.addControl(drawControl);

const featureGroup = new L.FeatureGroup().addTo(map);
map.on(L.Draw.Event.CREATED, e => {
  featureGroup.clearLayers();
  drawnItem = e.layer;
  featureGroup.addLayer(drawnItem);
  centerLatLng = drawnItem.getBounds().getCenter();
});

if (!isNew) {
  const ref = doc(db, `routes/${routeId}/pois`, poiId);
  getDoc(ref).then(snap => {
    const poi = snap.data();
    titleInput.value = poi.title || "";
    descriptionInput.value = poi.description || "";
    languageInput.value = poi.language || "";
    activeSwitch.checked = !!poi.active;
    if (poi.image) {
      imageUrl = poi.image;
    }
    if (poi.audio) {
      audioUrl = poi.audio;
    }
    if (poi.lat && poi.lng) {
      centerLatLng = [poi.lat, poi.lng];
      const marker = L.marker(centerLatLng).addTo(map);
      map.setView(centerLatLng, 13);
    }
  });
}

imageInput.addEventListener("change", async () => {
  const file = imageInput.files[0];
  if (!file) return;
  const storageRef = ref(storage, "poi-images/" + file.name);
  await uploadBytes(storageRef, file);
  imageUrl = await getDownloadURL(storageRef);
});

audioInput.addEventListener("change", async () => {
  const file = audioInput.files[0];
  if (!file) return;
  const storageRef = ref(storage, "poi-audio/" + file.name);
  await uploadBytes(storageRef, file);
  audioUrl = await getDownloadURL(storageRef);
});

window.lagre = async function () {
  if (!centerLatLng) return alert("Du må tegne et område på kartet først.");
  const id = poiId || Date.now().toString();
  const data = {
    title: titleInput.value,
    description: descriptionInput.value,
    lat: centerLatLng.lat,
    lng: centerLatLng.lng,
    image: imageUrl,
    audio: audioUrl,
    language: languageInput.value,
    active: activeSwitch.checked
  };
  await setDoc(doc(db, `routes/${routeId}/pois`, id), data);
  alert("Lagret!");
  location.href = "admin-route.html?id=" + routeId;
};
