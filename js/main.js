// main.js

/**
 * Initializes the application features.
 */
function init() {
  setupDarkModeToggle();
  setupToastNotifications();
  setupGoogleAnalytics();
}

/**
 * Sets up the dark mode toggle.
 */
function setupDarkModeToggle() {
  const toggle = document.getElementById('dark-mode-toggle');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));  
  });
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}

/**
 * Displays toast notifications.
 * @param {string} message - The message to display.
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/**
 * Sets up Google Analytics tracking.
 */
function setupGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID'); // Replace with your Google Analytics tracking ID.
}

/**
 * Lazily loads images.
 */
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.onload = () => img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, options);

  images.forEach(image => {
    observer.observe(image);
  });
}

/**
 * Handles errors gracefully.
 * @param {Function} fn - The function to execute.
 */
function handleError(fn) {
  try {
    fn();
  } catch (error) {
    console.error('Error occurred:', error);
    showToast('An error occurred. Please try again later.');
  }
}

// Initialize the app
init();