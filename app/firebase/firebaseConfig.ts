import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBM9VWlJ6gsq9pnlenSd-vPilh7L7TqWyk",
    authDomain: "alarm-learning-app.firebaseapp.com",
    projectId: "alarm-learning-app",
    storageBucket: "alarm-learning-app.firebasestorage.app",
    messagingSenderId: "72928785089",
    appId: "1:72928785089:web:0fb78b11e5223d3100da40"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db; // default export を追加
export { db };
