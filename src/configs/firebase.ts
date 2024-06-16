import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyDbGGXxPO8SQOxM98a9jP7O_nFKJzBdUoY",
    authDomain: "plat-dbe12.firebaseapp.com",
    databaseURL: "https://plat-dbe12-default-rtdb.firebaseio.com",
    projectId: "plat-dbe12",
    storageBucket: "plat-dbe12.appspot.com",
    messagingSenderId: "187264685778",
    appId: "1:187264685778:web:6441df53cd0079b20f7f0b",
    measurementId: "G-QGXGE5KCCC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };