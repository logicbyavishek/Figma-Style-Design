      // Page Load Animation
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

      // Navigation with Loading Animation
      function navigateToCanvas() {
        const loadingScreen = document.getElementById('loadingScreen');
        const app = document.getElementById('app');

        // Show loading screen
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hide');
        app.classList.remove('show');

        // Navigate after animation
        setTimeout(() => {
          window.location.href = './canvas.html';
        }, 1500);
      }

      // Create Button Click
      document.getElementById('createBtn').addEventListener('click', navigateToCanvas);

      // New Project Card Click
      document.getElementById('newProjectCard').addEventListener('click', navigateToCanvas);

      // Mobile menu functionality
      const menuToggle = document.getElementById('menuToggle');
      const sidebar = document.getElementById('sidebar');
      const sidebarOverlay = document.getElementById('sidebarOverlay');

      function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
      }

      // Menu toggle only opens/closes with menu icon
      menuToggle.addEventListener('click', toggleSidebar);
      
      // Clicking overlay closes sidebar
      sidebarOverlay.addEventListener('click', toggleSidebar);

      // Close sidebar when clicking nav links on mobile
      const navLinks = document.querySelectorAll('.nav a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            toggleSidebar();
          }
        });
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
          sidebarOverlay.classList.remove('active');
        }
      });