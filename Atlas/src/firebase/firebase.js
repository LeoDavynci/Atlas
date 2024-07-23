import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQM_SAF_c-Pvz7prsBbD0ymKcZFYMpf7k",
    authDomain: "atlas-a3dc9.firebaseapp.com",
    projectId: "atlas-a3dc9",
    storageBucket: "atlas-a3dc9.appspot.com",
    messagingSenderId: "1052322281234",
    appId: "1:1052322281234:web:c32658fcb35272d88465cb",
    measurementId: "G-R97P3MWXNM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);