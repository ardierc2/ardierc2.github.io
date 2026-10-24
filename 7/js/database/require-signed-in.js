import { requireSignedInUser } from './firebase-config.js';

const user = await requireSignedInUser('index.html');

if (user) {
  document.querySelector('.auth-data').classList.remove('auth-data');
}
