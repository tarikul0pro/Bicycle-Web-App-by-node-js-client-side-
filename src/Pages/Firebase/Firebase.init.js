import { initializeApp } from "firebase/app";

import firebaseConfig from "./Firebase.config.js";
const initializeFirebaseApp = () => {
    initializeApp(firebaseConfig);
}
export default initializeFirebaseApp