import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4X0K6DyRfGAcsYG1VPsfZ_3mo8PiW-0E",
  authDomain: "web-based-game-46547.firebaseapp.com",
  projectId: "web-based-game-46547",
  storageBucket: "web-based-game-46547.firebasestorage.app",
  messagingSenderId: "185996660369",
  appId: "1:185996660369:web:1e6b18b98fddfa0ba6b930",
  measurementId: "G-32750Y319M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };