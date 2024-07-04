// plugins/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBIuPiqHUi2Makb9yVqBK2NK3zDeZZUpiQ",
    authDomain: "reecfeff.firebaseapp.com",
    projectId: "reecfeff",
    storageBucket: "reecfeff.appspot.com",
    messagingSenderId: "687779412300",
    appId: "1:687779412300:web:8b4545df77facae2f637e9",
    measurementId: "G-66EBPC65XN"
};

// Check if Firebase has already been initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firestore, storage };


