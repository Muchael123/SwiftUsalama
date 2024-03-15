import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAK0QR82iwqvryr0WK27XPC27EHNMVnV7k",
  authDomain: "swiftusalama.firebaseapp.com",
  databaseURL: "https://swiftusalama-default-rtdb.firebaseio.com",
  projectId: "swiftusalama",
  storageBucket: "swiftusalama.appspot.com",
  messagingSenderId: "454927728343",
  appId: "1:454927728343:web:58a8a2e05e1e439e263a92"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
//android 519757743420-vlgf7c90q0m77gf76os9dnan6g7cb4qn.apps.googleusercontent.com
