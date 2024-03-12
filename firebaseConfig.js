import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfQ-sN5klppEA-qkkpYDNyNq_hV2rx8Fg",
  authDomain: "chatgpt-clone-b7c8b.firebaseapp.com",
  projectId: "chatgpt-clone-b7c8b",
  storageBucket: "chatgpt-clone-b7c8b.appspot.com",
  messagingSenderId: "1095999636073",
  appId: "1:1095999636073:web:1a2b8164e2fce3c241d8f8",
  measurementId: "G-NNQD4YNE61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { db,app, auth };