import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqeI5qtIxOeWJ4k5Fzj7wFTu804DcTqW0",
  authDomain: "imaginoir-3c8c5.firebaseapp.com",
  projectId: "imaginoir-3c8c5",
  storageBucket: "imaginoir-3c8c5.firebasestorage.app",
  messagingSenderId: "509351249746",
  appId: "1:509351249746:web:6420e16475bd09280a5c8b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
