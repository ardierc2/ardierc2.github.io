const user = await getCurrentUser();
if (!user) {
  location.replace('index.html');
} else {
  document.querySelector('.auth-data').classList.remove('auth-data');
}
