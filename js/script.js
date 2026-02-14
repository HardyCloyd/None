// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize the page
function initializePage() {
    // Set up welcome screen click
    const welcomeScreen = document.getElementById('welcomeScreen');
    welcomeScreen.addEventListener('click', function() {
        openMainContent();
    });

    // Check date and set appropriate button
    checkDateAndSetButton();
    
    // Initialize slideshow
    initSlideshow();
    
    // Add message card animations
    setupMessageCards();
}

// Music Control Functions
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    
    if (music.paused) {
        music.play();
        musicIcon.textContent = '🎵';
        musicToggle.classList.add('playing');
    } else {
        music.pause();
        musicIcon.textContent = '🔇';
        musicToggle.classList.remove('playing');
    }
}

// Auto-play music with user interaction (required by browsers)
function initMusic() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // Try to autoplay (may be blocked by browser)
    music.play().then(() => {
        musicToggle.classList.add('playing');
    }).catch(() => {
        // Autoplay was prevented, user needs to click
        console.log('Music autoplay prevented. Click the music button to play.');
    });
}

// Open main content
function openMainContent() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    
    welcomeScreen.style.display = 'none';
    mainContent.classList.add('active');
    
    // Try to start music when entering main content
    initMusic();
    
    // Add sound effect (optional - can be added if you have audio files)
    playTransitionSound();
}

// Check date and set appropriate button/message
function checkDateAndSetButton() {
    const now = new Date();
    const currentDate = now.getDate();
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
    
    const valentineButton = document.getElementById('valentineButton');
    const monthsaryButton = document.getElementById('monthsaryButton');
    const dateMessage = document.getElementById('dateMessage');
    
    // Check if it's February 14 (Valentine's Day)
    if (currentMonth === 2 && currentDate === 14) {
        valentineButton.style.display = 'block';
        monthsaryButton.style.display = 'none';
        dateMessage.textContent = "Happy Monthsary loveee!";
        dateMessage.style.color = '#9B59B6';
    } 
    // Check if it's February 15 or later
    else if (currentMonth === 2 && currentDate >= 15) {
        valentineButton.style.display = 'none';
        monthsaryButton.style.display = 'block';
        dateMessage.textContent = "Celebrating Our Love Every Day!";
        dateMessage.style.color = '#9B59B6';
    }
    // Check if it's the 14th of any other month (monthsary)
    else if (currentDate === 14 && currentMonth !== 2) {
        valentineButton.style.display = 'none';
        monthsaryButton.style.display = 'block';
        dateMessage.textContent = "Happy Monthsary, My Love!";
        dateMessage.style.color = '#9B59B6';
    }
    // Default for other dates
    else {
        valentineButton.style.display = 'block';
        monthsaryButton.style.display = 'none';
        dateMessage.textContent = "Every Day With You Is Special!";
        dateMessage.style.color = '#9B59B6';
    }
}

// Show Valentine's Day message
function showValentineMessage() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-emoji">💝</div>
        <h2>Happy Monthsary mylove!</h2>
        <p>On this special day, I want you to know that you are the love of my life.</p>
        <p>Every moment with you is a blessing, and I'm so grateful to have you by my side.</p>
        <p>You make my heart skip a beat, and my life complete.</p>
        <p>With or without love, I will always choose you, cherish you, and love you with all my heart.</p>
        <p>I love you more than words can express!</p>
    `;
    openModal();
}

// Show Monthsary message
function showMonthsaryMessage() {
    const modalBody = document.getElementById('modalBody');
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[now.getMonth()];
    
    modalBody.innerHTML = `
        <div class="modal-emoji">🎉</div>
        <h2>Happy Monthsary!</h2>
        <p>Another beautiful month with you has passed, and my love for you only grows stronger!</p>
        <p>Every day with you is an adventure, and I can't wait for all the memories we'll create together.</p>
        <p>Thank you for being my partner, my best friend, and my everything.</p>
        <p>Here's to many more months and years together!</p>
        <p style="font-size: 1rem; margin-top: 20px; color: #999;">Celebrating ${currentMonth}!</p>
    `;
    openModal();
}

// Open modal
function openModal() {
    const modal = document.getElementById('surpriseModal');
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('surpriseModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('surpriseModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Slideshow functionality
let currentSlideIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function initSlideshow() {
    showSlide(currentSlideIndex);
    // Auto advance every 8 seconds for emotional content
    setInterval(() => {
        changeSlide(1);
    }, 8000);
    
    // Add touch support for mobile swipe
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
        slideshowContainer.addEventListener('touchend', handleTouchEnd, false);
    }
}

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left - next slide
        changeSlide(1);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right - previous slide
        changeSlide(-1);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

// Setup message cards animations
function setupMessageCards() {
    const messageCards = document.querySelectorAll('.message-card');
    
    messageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.message-icon');
            icon.classList.add('rotating');
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.message-icon');
            icon.classList.remove('rotating');
        });
    });
}

// Play transition sound (optional)
function playTransitionSound() {
    // You can add audio file here if you want
    // const audio = new Audio('assets/audio/transition.mp3');
    // audio.play();
}

// Add confetti effect
function addConfetti() {
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700', '#ff69b4'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = Math.random();
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confettiContainer.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
    }
    
    // Remove confetti container after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Add sparkle effect to buttons
function addSparkleEffect(element) {
    const sparkle = document.createElement('span');
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '20px';
    sparkle.textContent = '✨';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.opacity = '1';
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.opacity = '0';
        setTimeout(() => {
            sparkle.remove();
        }, 500);
    }, 500);
}

// Add random sparkles to buttons
setInterval(() => {
    const buttons = document.querySelectorAll('.btn-valentine, .btn-monthsary');
    buttons.forEach(button => {
        if (button.offsetParent !== null) { // Check if button is visible
            if (Math.random() > 0.7) {
                button.style.position = 'relative';
                addSparkleEffect(button);
            }
        }
    });
}, 2000);

// Easter egg: Secret message on triple click
let clickCount = 0;
let clickTimer = null;

document.addEventListener('click', function() {
    clickCount++;
    
    if (clickCount === 1) {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000);
    }
    
    if (clickCount === 5) {
        clearTimeout(clickTimer);
        clickCount = 0;
        showSecretMessage();
    }
});

function showSecretMessage() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-emoji">🎁</div>
        <h2>Secret Message!</h2>
        <p>You found the secret message!</p>
        <p>You're not just my girlfriend, you're my best friend, my partner in crime, and my soulmate.</p>
        <p>I promise to love you through every season, every challenge, and every adventure.</p>
        <p>You make my world brighter, my heart fuller, and my life so much better!</p>
        <p style="font-size: 0.9rem; margin-top: 20px; color: #999;">(Click anywhere 5 times to see this again!)</p>
    `;
    openModal();
}

// Image Modal Functions
let currentModalImageIndex = 0;
let allImageSources = [];

function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('imageCounter');
    const loader = document.getElementById('imageLoader');
    
    // Find the index of the clicked image
    currentModalImageIndex = allImageSources.indexOf(imageSrc);
    
    modal.classList.add('active');
    loader.classList.add('active');
    modalImg.style.opacity = '0';
    
    // Load image
    const img = new Image();
    img.onload = function() {
        modalImg.src = imageSrc;
        modalImg.alt = `Photo ${currentModalImageIndex + 1} of ${allImageSources.length}: Our special memory`;
        loader.classList.remove('active');
        modalImg.style.opacity = '1';
        updateImageCounter();
    };
    img.onerror = function() {
        // Hide loader even if image fails to load
        loader.classList.remove('active');
        modalImg.style.opacity = '1';
        updateImageCounter();
    };
    img.src = imageSrc;
    
    document.body.style.overflow = 'hidden';
}

function navigateModalImage(direction) {
    const modalImg = document.getElementById('modalImage');
    const loader = document.getElementById('imageLoader');
    
    // Add fade out effect
    modalImg.classList.add('fade-out');
    
    setTimeout(() => {
        currentModalImageIndex += direction;
        
        // Wrap around
        if (currentModalImageIndex >= allImageSources.length) {
            currentModalImageIndex = 0;
        } else if (currentModalImageIndex < 0) {
            currentModalImageIndex = allImageSources.length - 1;
        }
        
        // Show loader
        loader.classList.add('active');
        modalImg.style.opacity = '0';
        
        // Load new image
        const img = new Image();
        img.onload = function() {
            modalImg.src = allImageSources[currentModalImageIndex];
            modalImg.alt = `Photo ${currentModalImageIndex + 1} of ${allImageSources.length}: Our special memory`;
            updateImageCounter();
            loader.classList.remove('active');
            
            // Remove fade out effect
            modalImg.classList.remove('fade-out');
            modalImg.style.opacity = '1';
        };
        img.onerror = function() {
            // Hide loader even if image fails to load
            loader.classList.remove('active');
            modalImg.classList.remove('fade-out');
            modalImg.style.opacity = '1';
            updateImageCounter();
        };
        img.src = allImageSources[currentModalImageIndex];
    }, 150);
}

function updateImageCounter() {
    const counter = document.getElementById('imageCounter');
    counter.textContent = `${currentModalImageIndex + 1} / ${allImageSources.length}`;
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Add click handlers to all slideshow images
function initializeImageModal() {
    const slideImages = document.querySelectorAll('.slide-image');
    
    // Build array of all image sources
    allImageSources = [];
    slideImages.forEach(image => {
        allImageSources.push(image.src);
        image.addEventListener('click', function(e) {
            e.stopPropagation();
            openImageModal(this.src);
        });
    });
    
    // Add touch swipe support for image modal
    const imageModal = document.getElementById('imageModal');
    let modalTouchStartX = 0;
    let modalTouchEndX = 0;
    
    imageModal.addEventListener('touchstart', function(e) {
        modalTouchStartX = e.changedTouches[0].screenX;
    }, false);
    
    imageModal.addEventListener('touchend', function(e) {
        modalTouchEndX = e.changedTouches[0].screenX;
        handleModalSwipe();
    }, false);
    
    function handleModalSwipe() {
        const swipeThreshold = 50;
        
        if (modalTouchEndX < modalTouchStartX - swipeThreshold) {
            // Swiped left - next image
            navigateModalImage(1);
        }
        
        if (modalTouchEndX > modalTouchStartX + swipeThreshold) {
            // Swiped right - previous image
            navigateModalImage(-1);
        }
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    initializeImageModal();
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Press 'L' for love message
    if (event.key.toLowerCase() === 'l') {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <div class="modal-emoji">�</div>
            <h2>Love Note</h2>
            <p>Just a reminder that I love you!</p>
        `;
        openModal();
    }
    
    // Press ESC to close modal
    if (event.key === 'Escape') {
        closeModal();
        closeImageModal();
    }
    
    // Arrow keys to navigate in image modal
    const imageModal = document.getElementById('imageModal');
    if (imageModal.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            navigateModalImage(-1);
        } else if (event.key === 'ArrowRight') {
            navigateModalImage(1);
        }
    }
});

console.log('Made with love for someone special!');
console.log('Press "L" for a surprise!');
