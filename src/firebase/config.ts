
// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Helper function to ensure required environment variables are set
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    const error = new Error(`Error: La variable de entorno ${key} no está definida. Asegúrate de crear un archivo .env.local y añadirla.`);
    console.error(error.message);
    throw error;
  }
  return value;
}

// Initialize Firebase
let app: FirebaseApp | undefined;
let storage: FirebaseStorage | undefined;

try {
  const firebaseConfig = {
    apiKey: getEnvVar("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: getEnvVar("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: getEnvVar("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: getEnvVar("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getEnvVar("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getEnvVar("NEXT_PUBLIC_FIREBASE_APP_ID"),
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // This one is optional
  };
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
} catch (e) {
  console.error("Error al inicializar Firebase. Asegúrate de que tus variables de entorno en .env.local son correctas.", e);
}

export { app, storage };
