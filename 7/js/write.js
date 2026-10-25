import {
  addDoc,
  collection,
} from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
import { db, auth } from '../firebase-config.js';

const form = document.getElementById('contact-form');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('text');
const messageSentDialog = document.getElementById('message-sent-dialog');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//    Show message sent dialog
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function showMessageSentDialog() {
  if (messageSentDialog) {
    messageSentDialog.getElementsByTagName('p')[0].textContent =
      'Your message has been sent successfully';
    messageSentDialog.showModal();
  } else {
    console.error('Message sent dialog not found');
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//      Show error dialog
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<
function showErrorDialog(error) {
  if (messageSentDialog) {
    messageSentDialog.getElementsByTagName('p')[0].textContent =
      error || 'Error: Please check your input and try again.';
    messageSentDialog.showModal();
  } else {
    console.error('Message sent dialog not found');
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//    Handle form submission
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Add event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  await auth.authStateReady();
  if (!auth.currentUser) {
    showErrorDialog('Error: User not signed in.');
    return;
  }

  try {
    await addDoc(collection(db, 'contacts'), {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      message: messageField.value.trim(),
    });

    form.reset();
    showMessageSentDialog();
  } catch (error) {
    showErrorDialog();
  }
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  Handle closing the message sent dialog
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// close modal when clicking the close button
const closeMessageSentButton = document.getElementById('close-message-sent');
closeMessageSentButton.addEventListener('click', () => {
  messageSentDialog.close();
});

// close modal if clicking outside the dialog box
messageSentDialog.addEventListener('click', (event) => {
  if (event.target !== messageSentDialog) return;

  const bounds = messageSentDialog.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  ) {
    messageSentDialog.close();
  }
});
