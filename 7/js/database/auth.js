import { isUserSignedIn, signInWithGoogle } from './firebase-config.js';
import { auth } from './firebase-config.js';

const loginButton = document.querySelectorAll('.login-button');

// Add event listeners to login buttons for Google sign-in
loginButton.forEach((button) => {
  button.addEventListener('click', async () => {
    console.log('Signing in with Google...');
    const result = await signInWithGoogle();
    console.log('Sign-in process completed.', result);
  });
});

// Add event listeners to logout buttons for signing out
const logoutButton = document.querySelectorAll('.logout-button');
logoutButton.forEach((button) => {
  button.addEventListener('click', async () => {
    console.log('Signing out...');
    await auth.signOut();
    location.replace('index.html');
    console.log('Sign-out process completed.');
  });
});

// * Function to render nav
function renderNav(user) {
  if (user) {
    document.querySelectorAll('.auth').forEach((el) => el.classList.remove('auth-hidden'));
  } else {
    document.querySelectorAll('.auth').forEach((el) => el.classList.add('auth-hidden'));
  }
}

// * Function to swap login button visibility based on user state
function swapLogin(user) {
  if (user) {
    document.querySelectorAll('.login-button').forEach((el) => el.classList.add('auth-hidden'));
    document.querySelectorAll('.logout-button').forEach((el) => el.classList.remove('auth-hidden'));
  } else {
    document.querySelectorAll('.login-button').forEach((el) => el.classList.remove('auth-hidden'));
    document.querySelectorAll('.logout-button').forEach((el) => el.classList.add('auth-hidden'));
  }
}

auth.onAuthStateChanged(async (user) => {
  renderNav(user);
  swapLogin(user);
});
