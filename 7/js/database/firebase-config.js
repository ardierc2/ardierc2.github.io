// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPMurUPbIFvLlAzXyUHRzDFXbct4NKLtk',
  authDomain: 'lights-out-6dc51.firebaseapp.com',
  databaseURL: 'https://lights-out-6dc51-default-rtdb.firebaseio.com',
  projectId: 'lights-out-6dc51',
  storageBucket: 'lights-out-6dc51.firebasestorage.app',
  messagingSenderId: '975171091190',
  appId: '1:975171091190:web:5834973c59e2549edf4ad7',
};

// ! Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ! initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// * Function to sign in with Google using a redirect
export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// * Function to sign out the current user
export async function signOutUser(redirect) {
  await signOut(auth);
  location.replace(redirect);
}

// * Function to require the user to be signed in, otherwise redirect to the login page
export async function requireSignedInUser(redirect) {
  const user = await getCurrentUser();
  if (!user) {
    location.replace(redirect);
  }
  return user;
}

// * Function to get the current signed-in user
export async function getCurrentUser() {
  await auth.authStateReady();
  return auth.currentUser;
}

// * Function to check if a user is signed in
export async function isUserSignedIn() {
  await auth.authStateReady();
  return auth.currentUser !== null;
}
