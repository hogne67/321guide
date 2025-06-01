import { db, storage } from "../firebase-init.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { checkAccess, loggUt } from "../auth/auth.js";

checkAccess(["admin", "producer"]);

// Her kan du legge til admin-funksjonalitet senere
