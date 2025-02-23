import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIuPiqHUi2Makb9yVqBK2NK3zDeZZUpiQ",
    authDomain: "reecfeff.firebaseapp.com",
    projectId: "reecfeff",
    storageBucket: "reecfeff.appspot.com",
    messagingSenderId: "687779412300",
    appId: "1:687779412300:web:8b4545df77facae2f637e9",
    measurementId: "G-66EBPC65XN"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
