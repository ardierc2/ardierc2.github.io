import { auth, googleProvider } from '../firebase-config.js';

// * Function to sign in with Google using a redirect
export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// * Function to sign out the current user
export async function signOutUser(redirect) {
  await signOut(auth);
  location.replace(redirect);
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
