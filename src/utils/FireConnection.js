import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBYt1PEtXUBHzTlqEEv47e9iSzaEBSLiro',
  authDomain: 'vecna-project.firebaseapp.com',
  projectId: 'vecna-project',
  storageBucket: 'vecna-project.appspot.com',
  messagingSenderId: '885079794024',
  appId: '1:885079794024:web:fd88909dbe22471bf4f6dd',
  measurementId: 'G-ECE613MR24',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
