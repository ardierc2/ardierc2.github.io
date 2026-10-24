import { signOutUser, signInWithGoogle } from './firebase-config.js';
import { auth } from './firebase-config.js';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//     Authentication Handling
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Function to swap login button visibility based on user state
function swapLogin(user) {
  if (!user) {
    const navLogin = document.querySelectorAll('.nav-login');
    navLogin.forEach((el) => (el.textContent = 'Login'));
    navLogin.forEach((el) => el.classList.remove('logout-button'));
    navLogin.forEach((el) => el.classList.add('login-button'));
    navLogin.forEach((el) => el.classList.remove('auth-hidden'));
  } else {
    const navLogin = document.querySelectorAll('.nav-login');
    navLogin.forEach((el) => (el.textContent = 'Logout'));
    navLogin.forEach((el) => el.classList.remove('login-button'));
    navLogin.forEach((el) => el.classList.add('logout-button'));
    navLogin.forEach((el) => el.classList.remove('auth-hidden'));
  }
}

// Function to render nav
function renderNav(user) {
  if (user) {
    document.querySelectorAll('.auth').forEach((el) => el.classList.remove('auth-hidden'));
  } else {
    document.querySelectorAll('.auth').forEach((el) => el.classList.add('auth-hidden'));
  }
}

// Helper Function for event listeners to handle login with Google authentication
async function login() {
  console.log('Signing in with Google...');
  await signInWithGoogle();
  console.log('Sign-in process completed.');
}

// Helper Function for event listeners to handle logout
async function logout() {
  console.log('Signing out...');
  await signOutUser('index.html');
  console.log('Sign-out process completed.');
}

// Function to add event listeners to login and logout buttons
function addListeners() {
  const loginButton = document.querySelectorAll('.login-button');
  loginButton.forEach((button) => {
    button.removeEventListener('click', logout);
    button.addEventListener('click', login);
  });

  const logoutButton = document.querySelectorAll('.logout-button');
  logoutButton.forEach((button) => {
    button.removeEventListener('click', login);
    button.addEventListener('click', logout);
  });
}

// Listen for authentication state changes and update UI accordingly
auth.onAuthStateChanged(async (user) => {
  renderNav(user);
  swapLogin(user);
  addListeners();
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  Sign-in dialog modal handling
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Sign-in dialog modal handling for explore card buttons
const signInDialog = document.getElementById('sign-in-dialog');

// Check if the sign-in dialog exists before adding event listeners (It doesn't exist on all pages)
if (signInDialog) {
  // Ensure the dialog is hidden initially
  signInDialog.close();

  // Get references to dialog elements
  const message = document.getElementById('sign-in-message');
  const continueButton = document.getElementById('continue-with-google');
  const cancelButton = document.getElementById('cancel-sign-in');
  let destination = '';

  // Event listener for explore card buttons to trigger sign-in dialog if not authenticated
  document.querySelector('.explore').addEventListener('click', async (event) => {
    // get the closest explore card button link element
    const target = event.target.closest('.explore-card-button a');

    // Prevent the default link behavior and check authentication status
    event.preventDefault();
    await auth.authStateReady();
    // If the user is already authenticated, redirect to the target URL
    if (auth.currentUser) {
      window.location.assign(target.getAttribute('href'));
      return;
    }

    // Show the sign-in dialog if the user is not authenticated
    destination = target.getAttribute('href');
    message.textContent = `You need to sign in to ${target.textContent || destination}`;
    signInDialog.showModal();
  });

  // Event listener for cancel button to close the sign-in dialog
  cancelButton.addEventListener('click', () => {
    signInDialog.close();
  });

  // Event listener for continue button to sign in with Google and redirect
  continueButton.addEventListener('click', async () => {
    if (!destination) return;

    // Close the sign-in dialog before attempting to sign in
    signInDialog.close();

    // Attempt to sign in with Google and redirect to the destination page
    try {
      await signInWithGoogle();
      window.location.assign(destination);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  });

  // close modal if clicking outside the dialog box
  signInDialog.addEventListener('click', (event) => {
    if (event.target !== signInDialog) return;

    const bounds = signInDialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      signInDialog.close();
    }
  });
}
