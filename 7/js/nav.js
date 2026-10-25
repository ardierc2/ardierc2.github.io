const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('#primary-links');
const currentPage = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-link[href]').forEach((link) => {
  if (link.getAttribute('href') === '#' || link.getAttribute('href') === currentPage) {
    link.setAttribute('aria-current', 'page');
  }
});

// Toggle navigation hamburger menu on click
toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  links.classList.toggle('is-open', !isOpen);
});
