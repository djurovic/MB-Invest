// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the "to-top" button element
    const toTopButton = document.querySelector('.to-top');
    
    // Add click event listener to the button
    if (toTopButton) {
        toTopButton.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Smooth scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'  // This creates the smooth scrolling effect
            });
        });
    }
    
    // Optional: Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            toTopButton.style.opacity = '1';
        } else {
            toTopButton.style.opacity = '0.7';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'overlay';
        document.body.appendChild(newOverlay);
    }
    
    // Add click event listener to menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle active classes
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.querySelector('.overlay').classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking overlay
    document.querySelector('.overlay')?.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


function updateFavicon() {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const faviconHref = darkMode ? "./assets/TabIconDark.svg" : "./assets/TabIcon.svg";
  
    let favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.remove(); // Remove the existing favicon
    }
  
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = faviconHref;
    document.head.appendChild(newFavicon);
  
    console.log("Favicon updated to:", faviconHref); // Debugging
  }
  
  // Run on page load
  updateFavicon();
  
  // Listen for theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);
  