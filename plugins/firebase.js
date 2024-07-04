// plugins/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { defineNuxtPlugin } from "@nuxtjs/composition-api"; // Gunakan ini jika menggunakan Nuxt 3 atau Composition API di Nuxt 2

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyBIuPiqHUi2Makb9yVqBK2NK3zDeZZUpiQ",
    authDomain: "reecfeff.firebaseapp.com",
    projectId: "reecfeff",
    storageBucket: "reecfeff.appspot.com",
    messagingSenderId: "687779412300",
    appId: "1:687779412300:web:8b4545df77facae2f637e9",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
let auth;

if (typeof window !== "undefined") {
  auth = getAuth(app);
  signInAnonymously(auth).catch((error) => {
    console.error("Error signing in anonymously:", error);
  });
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("firestore", firestore);
});




