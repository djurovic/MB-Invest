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
    // Gallery creation function
    function createGallery(carouselId, prevBtnId, nextBtnId, imagesArray) {
        const carousel = document.getElementById(carouselId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
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
            const leftIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
            const rightIndex = (currentIndex + 1) % imagesArray.length;
            
            // Add images
            carousel.appendChild(createImageElement(imagesArray[leftIndex], 'left'));
            carousel.appendChild(createImageElement(imagesArray[currentIndex], 'center'));
            carousel.appendChild(createImageElement(imagesArray[rightIndex], 'right'));
        }
        
        // Update carousel
        function updateCarousel() {
            const imageContainers = carousel.querySelectorAll('.image-container');
            
            // Calculate indices with wrapping
            const leftIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
            const rightIndex = (currentIndex + 1) % imagesArray.length;
            
            // Update image sources
            imageContainers[0].querySelector('img').src = imagesArray[leftIndex];
            imageContainers[1].querySelector('img').src = imagesArray[currentIndex];
            imageContainers[2].querySelector('img').src = imagesArray[rightIndex];
        }
        
        // Initialize
        initializeCarousel();
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % imagesArray.length;
            updateCarousel();
        });
    }
    
    // First gallery images
    const gallery1Images = [
        'assets/projects/galerija1/slika1.png',
        'assets/projects/galerija1/slika2.png',
        'assets/projects/galerija1/slika3.png',
        'assets/projects/galerija1/slika4.png',
        'assets/projects/galerija1/slika5.png',
        'assets/projects/galerija1/slika6.png',
        'assets/projects/galerija1/slika7.png'
    ];
    
    // Second gallery images - replace with your actual image paths
    const gallery2Images = [
        'assets/projects/galerija2/slika1.png',
        'assets/projects/galerija2/slika2.png',
        'assets/projects/galerija2/slika3.png',
        'assets/projects/galerija2/slika4.png',
        'assets/projects/galerija2/slika5.png',
        'assets/projects/galerija2/slika6.png',
        'assets/projects/galerija2/slika7.png'
    ];
    
    // Initialize both galleries
    createGallery('imageCarousel1', 'prevBtn1', 'nextBtn1', gallery1Images);
    createGallery('imageCarousel2', 'prevBtn2', 'nextBtn2', gallery2Images);
    
    // Keyboard navigation - only for the first gallery or currently focused gallery
    document.addEventListener('keydown', function(e) {
        // You may want to implement logic to determine which gallery is currently in focus
        if (e.key === 'ArrowLeft') {
            document.getElementById('prevBtn1').click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('nextBtn1').click();
        }
    });
});