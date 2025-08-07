import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "shabad-papers-official",
  "appId": "1:326433016259:web:21cef8ec5fb7340e081576",
  "storageBucket": "shabad-papers-official.firebasestorage.app",
  "apiKey": "AIzaSyAZyufFPb8FhqY-xL9jpxCwGpDPCNNpzSM",
  "authDomain": "shabad-papers-official.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "326433016259"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

export { app, auth };
