import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDpDpm7xHn7xE4IidYLeXy0CzZzg_n5Aoc',
  authDomain: 'asr-webportal.firebaseapp.com',
  projectId: 'asr-webportal',
  storageBucket: 'asr-webportal.appspot.com',
  messagingSenderId: '410473504454',
  appId: '1:410473504454:web:0d43ad62e5ec6cd8cf41c7',
  measurementId: 'G-W3NMZP04RD',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
