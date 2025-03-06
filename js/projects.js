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


// Galerija
document.addEventListener('DOMContentLoaded', function() {
    // Images array - replace with your actual image paths
    const basePath = 'assets/projects/galerija1/'

    const images = [
                basePath + 'slika1.png',
                basePath + 'slika2.png',
                basePath + 'slika3.png',
                basePath + 'slika4.png',
                basePath + 'slika5.png',
                basePath + 'slika6.png',
                basePath + 'slika7.png'
            ];
    
    const carousel = document.getElementById('imageCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    
    // Create image containers
    function createImageElement(src, className) {
        const container = document.createElement('div');
        container.className = 'image-container ' + className;
        
        const img = document.createElement('img');
        img.src = src;
        img.className = 'gallery-image';
        img.alt = 'Gallery Image';
        
        container.appendChild(img);
        return container;
    }
    
    // Initial setup
    function initializeCarousel() {
        // Clear carousel
        carousel.innerHTML = '';
        
        // Calculate indices with wrapping
        const leftIndex = (currentIndex - 1 + images.length) % images.length;
        const rightIndex = (currentIndex + 1) % images.length;
        
        // Add images
        carousel.appendChild(createImageElement(images[leftIndex], 'left'));
        carousel.appendChild(createImageElement(images[currentIndex], 'center'));
        carousel.appendChild(createImageElement(images[rightIndex], 'right'));
    }
    
    // Update carousel
    function updateCarousel() {
        const imageContainers = document.querySelectorAll('.image-container');
        
        // Calculate indices with wrapping
        const leftIndex = (currentIndex - 1 + images.length) % images.length;
        const rightIndex = (currentIndex + 1) % images.length;
        
        // Update image sources
        imageContainers[0].querySelector('img').src = images[leftIndex];
        imageContainers[1].querySelector('img').src = images[currentIndex];
        imageContainers[2].querySelector('img').src = images[rightIndex];
    }
    
    // Initialize
    initializeCarousel();
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});