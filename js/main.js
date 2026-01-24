// ===============================
// Page Load Animation
// ===============================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const app = document.getElementById('app');

  // Show loading for 3 seconds
  setTimeout(() => {
    loadingScreen.classList.add('hide');
    app.classList.add('show');

    // Remove loading screen from DOM after animation
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 3000);
});


// ===============================
// Navigation with Loading Animation
// ===============================
function navigateToCanvas() {
  const loadingScreen = document.getElementById('loadingScreen');
  const app = document.getElementById('app');

  loadingScreen.style.display = 'flex';
  loadingScreen.classList.remove('hide');
  app.classList.remove('show');

  setTimeout(() => {
    window.location.href = './canvas.html';
  }, 1500);
}


// ===============================
// Create Button & New Project Card
// ===============================
const createBtn = document.getElementById('createBtn');
if (createBtn) {
  createBtn.addEventListener('click', navigateToCanvas);
}

const newProjectCard = document.getElementById('newProjectCard');
if (newProjectCard) {
  newProjectCard.addEventListener('click', navigateToCanvas);
}


// ===============================
// Mobile Sidebar Logic (FIXED)
// ===============================
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open sidebar
function openSidebar() {
  sidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
  menuToggle.style.display = 'none'; // hide menu button
}

// Close sidebar
function closeSidebar() {
  sidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
  menuToggle.style.display = 'flex'; // show menu button
}

// Menu button → open sidebar
menuToggle.addEventListener('click', openSidebar);

// Overlay click → close sidebar
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking nav links (mobile)
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  });
});

// Window resize safety
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeSidebar();
  }
});
