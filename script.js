// Page Flip Functionality
let currentPage = 1;
const totalPages = 5;

// Initialize from URL parameter if present
function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam && !isNaN(pageParam) && pageParam >= 1 && pageParam <= totalPages) {
        currentPage = parseInt(pageParam);
        goToPage(currentPage);
    }
}

// Update URL parameter when page changes
function updateURLParameter(page) {
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.replaceState({}, '', url);
}

// Initialize page navigation
document.addEventListener('DOMContentLoaded', function() {
    initializePageNavigation();
    createPageIndicators();
    updateNavigationButtons();
    initializeFromURL(); // Initialize from URL parameter
    initializeGiftBox(); // Initialize gift box functionality
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add touch/swipe support for mobile
    initializeTouchNavigation();
});

function initializePageNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);
}

function createPageIndicators() {
    const indicatorsContainer = document.getElementById('pageIndicators');
    
    for (let i = 1; i <= totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'page-indicator';
        if (i === 1) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => goToPage(i));
        indicatorsContainer.appendChild(indicator);
    }
}

function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    const currentPageElement = document.querySelector(`[data-page="${currentPage}"]`);
    const targetPageElement = document.querySelector(`[data-page="${pageNumber}"]`);
    
    // Remove active class from current page
    currentPageElement.classList.remove('active');
    
    // Add appropriate transition classes
    if (pageNumber > currentPage) {
        currentPageElement.classList.add('prev');
        targetPageElement.classList.add('next');
    } else {
        currentPageElement.classList.add('next');
        targetPageElement.classList.add('prev');
    }
    
    // Update current page
    currentPage = pageNumber;
    
    // Trigger page transition
    setTimeout(() => {
        targetPageElement.classList.remove('prev', 'next');
        targetPageElement.classList.add('active');
        
        // Clean up previous page
        currentPageElement.classList.remove('prev', 'next');
    }, 50);
    
    updateNavigationButtons();
    updatePageIndicators();
    updateURLParameter(pageNumber); // Update URL parameter
    
    // Trigger page-specific animations
    triggerPageAnimations(pageNumber);
}

function goToNextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function updatePageIndicators() {
    const indicators = document.querySelectorAll('.page-indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentPage) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function handleKeyboardNavigation(e) {
    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            goToPreviousPage();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            goToNextPage();
            break;
        case 'Home':
            e.preventDefault();
            goToPage(1);
            break;
        case 'End':
            e.preventDefault();
            goToPage(totalPages);
            break;
    }
}

function initializeTouchNavigation() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Only trigger if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe right - go to previous page
                goToPreviousPage();
            } else {
                // Swipe left - go to next page
                goToNextPage();
            }
        }
    });
}

function triggerPageAnimations(pageNumber) {
    // Trigger animations specific to each page
    switch(pageNumber) {
        case 1:
            // Hero page animations
            animateFloatingElements();
            break;
        case 2:
            // Timeline animations
            animateTimelineItems();
            break;
        case 3:
            // Stats animations
            animateCounters();
            break;
        case 4:
            // Music page animations
            initializeMusicPlayer();
            break;
        case 5:
            // Surprise animations
            animateSurprise();
            break;
    }
}

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-heart, .floating-star');
    floatingElements.forEach((element, index) => {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = `float 6s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.5}s`;
        }, 100);
    });
}

function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateMomentCards() {
    const momentCards = document.querySelectorAll('.moment-card');
    momentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 150);
    });
}

function animateGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function animateMessages() {
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

function animateSurprise() {
    const surpriseBox = document.querySelector('.surprise-box');
    if (surpriseBox) {
        surpriseBox.style.opacity = '0';
        surpriseBox.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            surpriseBox.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            surpriseBox.style.opacity = '1';
            surpriseBox.style.transform = 'scale(1)';
            
            // Trigger confetti after animation
            setTimeout(() => {
                createConfetti();
            }, 1000);
        }, 200);
    }
}

// Loading Screen Animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.add('loaded');
            
            // Trigger initial page animations
            triggerPageAnimations(1);
        }, 500);
    }, 2000);
});

// Counter Animation for Stats
function animateCounters() {
    // Update days talking stat first
    updateDaysTalkingStat();
    
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.getAttribute('data-target');
        if (target === '∞') {
            counter.textContent = '∞';
            return;
        }
        
        const targetNum = parseInt(target);
        if (isNaN(targetNum) || targetNum === 0) {
            counter.textContent = '0';
            return;
        }
        
        const duration = 2000; // 2 seconds
        const increment = targetNum / (duration / 16); // 60fps
        let current = 0;
        
        // Reset counter to 0 before animating
        counter.textContent = '0';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Calculate days since first message
function calculateDaysTalking() {
    const startDate = new Date('2021-01-17');
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
}

// Update the days talking stat with calculated value
function updateDaysTalkingStat() {
    const daysTalking = calculateDaysTalking();
    const daysElement = document.querySelector('[data-target="0"]');
    if (daysElement) {
        daysElement.setAttribute('data-target', daysTalking);
    }
    
    // Also update the timeline text
    const timelineText = document.querySelector('.timeline-item:nth-child(3) p');
    if (timelineText) {
        timelineText.textContent = `${daysTalking} days of conversations, laughter, and love...`;
    }
}

// Interactive Moment Cards
document.addEventListener('DOMContentLoaded', function() {
    // Moment cards will be animated when page is shown
    // This function is called by triggerPageAnimations
});

// Add ripple effect to moment cards
function addRippleEffect() {
    const momentCards = document.querySelectorAll('.moment-card');
    
    momentCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(168, 230, 207, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Gallery Auto-scroll Pause on Hover
function initializeGalleryHover() {
    const galleryTrack = document.querySelector('.gallery-track');
    
    if (galleryTrack) {
        galleryTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        galleryTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// Birthday Surprise Confetti Effect
function createConfetti() {
    const colors = ['#A8E6CF', '#D4A5A5', '#FFB3BA', '#B3D9FF', '#FFD1DC'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Add some sparkle effects on click
document.addEventListener('click', function(e) {
    // Don't trigger sparkles on navigation buttons
    if (e.target.closest('.nav-btn') || e.target.closest('.page-indicator')) return;
    
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Keyboard shortcuts for special effects
document.addEventListener('keydown', function(e) {
    // Press 'C' for confetti
    if (e.key.toLowerCase() === 'c') {
        createConfetti();
    }
    
    // Press 'H' for hearts
    if (e.key.toLowerCase() === 'h') {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💚';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = Math.random() * 100 + 'vh';
                heart.style.fontSize = '30px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                heart.style.animation = 'heartFloat 3s ease-out forwards';
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100);
        }
    }
});

// Add heart float animation CSS
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-50px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Initialize additional features when page loads
document.addEventListener('DOMContentLoaded', function() {
    addRippleEffect();
    initializeGalleryHover();
    initializeImageModal();
    
    // If we're on page 3 (stats), animate counters immediately
    if (currentPage === 3) {
        setTimeout(() => {
            animateCounters();
        }, 500);
    }
});

// Image Modal Functionality
function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.getElementById('closeBtn');
    
    // Add click event listeners to all images
    const images = document.querySelectorAll('.media-item img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImage.src = this.src;
            modalCaption.textContent = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking the X button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}

// Music Player Functionality
const playlist = [
    {
        title: "Real and True",
        artist: "Future, Miley Cyrus, Mr Hudson",
        description: "Never in my life did I ever think there will be a Future x Miley Cyrus song that you would know about, like or even worse know the lyrics word for word for word haha. That day in the train was crazy.",
        filename: "01.mp3"
    },
    {
        title: "Found",
        artist: "Jacob Banks",
        description: "Jacob Banks is tired dear, he is tired. You washed and rinsed this song way too many times haha. I'm just glad you found a new song that is not passenger",
        filename: "02.mp3",
        startTime: 36
    },
    {
        title: "Life's for the Living",
        artist: "Passenger",
        description: "Ala odogwu, almighty",
        filename: "03.mp3",
        startTime: 61
    },
    {
        title: "Swear It Again",
        artist: "Westlife",
        description: "West life dierr wo boa oo. The whole the ho!",
        filename: "04.mp3",
        startTime: 5
    },
    {
        title: "O",
        artist: "Coldplay",
        description: "My whole life I listened to this song just liking the the flocka birddd part. But you actually looked into the lyrics and broke it down for me lol. I love you.",
        filename: "05.mp3",
        startTime: 28
    },
    {
        title: "Queen of My Heart",
        artist: "Westlife",
        description: "The classic that made us both sing along! I knew we had something magical. On the boat ride, in the room, even back in Ghana when we went to Osu",
        filename: "06.mp3",
        startTime: 11
    },
    {
        title: "Ich wünschte, du wärst verloren",
        artist: "Schmyt",
        description: "You introduced me to this German song from your Apple Music and translated it for me. Listening to you explain and translate it I was like nah this girl is special",
        filename: "07.mp3",
        startTime: 13
    },
    {
        title: "Let Her Go (Acoustic Version)",
        artist: "Passenger",
        description: "Ei Opana. You again? Yooo",
        filename: "08.mp3",
        startTime: 24
    },
    {
        title: "Army of One",
        artist: "Coldplay",
        description: "This is one of my favorite songs of all time and I'm glad you liked it too when I played it for you on our walks in Tannenbusch.",
        filename: "09.mp3",
        startTime: 64
    },
    {
        title: "Closer",
        artist: "The Chainsmokers, Halsey",
        description: "I'm just glad it's not passenger again dear lol.",
        filename: "10.mp3",
        startTime: 50
    },
    {
        title: "Venice Canals",
        artist: "Passenger",
        description: "And the fishes swimming in the venice canals... that's the only part I know. but as for you dierr, as if you wrote it with the man. Ei",
        filename: "11.mp3",
        startTime: 23
    },
    {
        title: "Next To Me",
        artist: "Imagine Dragons",
        description: "This song, you and baileys, Deadly combination lmao.",
        filename: "12.mp3",
        startTime: 22
    },
    {
        title: "Up in Flames",
        artist: "Coldplay",
        description: "Read this in my hoarse voice: Up in Flaaaaaaaaaaaames. Lmao",
        filename: "13.mp3",
        startTime: 50
    },
    {
        title: "i hate u, i love u",
        artist: "gnash, Olivia O'Brien",
        description: "I think we also discovered this song on your Apple Music on that random friday evening where we were just lazying about lol.",
        filename: "14.mp3",
        startTime: 0
    },
    {
        title: "For The Road",
        artist: "Dxt3r, BRYAN THE MENSAH",
        description: "I really like your dance to this song...",
        filename: "15.mp3",
        startTime: 44
    },
    {
        title: "Hit Me Where It Hurts",
        artist: "Caroline Polachek",
        description: "I honestly doubt you would remeber but we heard this song at Zara and I immediately fell in love with it and you said 'yeah e be fire' so that is why it is on this list.",
        filename: "16.mp3",
        startTime: 11
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isFullSong = false;
let audio = null;
let progressInterval = null;
let isLastSong = false;

function initializeMusicPlayer() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    updateSongInfo();
}

function updateSongInfo() {
    const currentSong = playlist[currentSongIndex];
    const trackNumber = String(currentSongIndex + 1).padStart(2, '0');
    document.getElementById('currentSongTitle').textContent = `${trackNumber}. ${currentSong.title}`;
    document.getElementById('currentSongArtist').textContent = currentSong.artist;
    document.getElementById('currentSongDescription').textContent = currentSong.description;
    
    // Check if this is the last song
    isLastSong = currentSongIndex === playlist.length - 1;
    
    // Show/hide Spotify link based on song position
    const spotifyLink = document.getElementById('spotifyLink');
    if (isLastSong) {
        spotifyLink.style.display = 'block';
    } else {
        spotifyLink.style.display = 'none';
    }
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    const currentSong = playlist[currentSongIndex];
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    // Stop any existing audio
    if (audio) {
        audio.pause();
        audio = null;
    }
    
    // Create audio element for preview (using actual MP3 files)
    audio = new Audio();
    audio.src = `public/${currentSong.filename}`;
    audio.volume = 0.7;
    
    // Set start time if specified
    const startTime = currentSong.startTime || 0;
    
    // Update UI
    isPlaying = true;
    playPauseBtn.innerHTML = `
        <svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
    `;
    
    // Start audio and progress
    audio.play().then(() => {
        console.log('Audio started playing:', currentSong.title);
    }).catch(e => {
        console.log('Audio play failed:', e);
        // Fallback to visual simulation if audio fails
        startProgress();
    });
    
    // Handle audio events
    audio.addEventListener('loadeddata', () => {
        // Set the start time after audio is loaded
        const startTime = currentSong.startTime || 0;
        audio.currentTime = startTime;
        startProgress();
    });
    
    audio.addEventListener('canplaythrough', () => {
        // Ensure we start at the right time when audio is ready to play
        const startTime = currentSong.startTime || 0;
        if (audio.currentTime < startTime) {
            audio.currentTime = startTime;
        }
    });
    
    audio.addEventListener('ended', () => {
        if (isPlaying) {
            nextSong();
        }
    });
    
    // Auto-advance after 20 seconds
    setTimeout(() => {
        if (isPlaying && audio) {
            audio.pause();
            nextSong();
        }
    }, 20000);
}

function pauseSong() {
    isPlaying = false;
    document.getElementById('playPauseBtn').innerHTML = `
        <svg class="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
    `;
    
    if (audio) {
        audio.pause();
    }
    stopProgress();
}


function nextSong() {
    if (currentSongIndex < playlist.length - 1) {
        currentSongIndex++;
        updateSongInfo();
        resetProgress();
        
        if (isPlaying) {
            setTimeout(() => {
                playSong();
            }, 1000);
        }
    } else {
        // Reached the end of playlist
        pauseSong();
        document.getElementById('spotifyLink').style.display = 'block';
    }
}

function startProgress() {
    const currentSong = playlist[currentSongIndex];
    const startTime = currentSong.startTime || 0;
    const duration = 20; // 20 seconds preview
    let progressStartTime = Date.now();
    
    progressInterval = setInterval(() => {
        if (!audio || !isPlaying) {
            clearInterval(progressInterval);
            return;
        }
        
        const elapsed = (Date.now() - progressStartTime) / 1000; // seconds elapsed
        const progress = (elapsed / duration) * 100;
        
        // Update progress bar
        document.getElementById('progressBar').style.width = Math.min(progress, 100) + '%';
        
        // Update time display with actual audio time
        const currentAudioTime = audio.currentTime;
        const minutes = Math.floor(currentAudioTime / 60);
        const seconds = Math.floor(currentAudioTime % 60);
        document.getElementById('currentTime').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Check if we should advance to next song
        if (elapsed >= duration) {
            nextSong();
        }
    }, 100);
}

function stopProgress() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}

function resetProgress() {
    stopProgress();
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('currentTime').textContent = '0:00';
    document.getElementById('totalTime').textContent = '0:20';
}

// Gift Box Functionality
function initializeGiftBox() {
    const giftBoxBtn = document.getElementById('giftBoxBtn');
    
    if (giftBoxBtn) {
        giftBoxBtn.addEventListener('click', openGiftBox);
    }
    
    // Password dialog event listeners
    const passwordDialog = document.getElementById('passwordDialog');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const cancelPassword = document.getElementById('cancelPassword');
    const closePasswordDialog = document.getElementById('closePasswordDialog');
    
    // Success dialog event listeners
    const successDialog = document.getElementById('successDialog');
    const claimGift = document.getElementById('claimGift');
    const cancelSuccess = document.getElementById('cancelSuccess');
    const closeSuccessDialog = document.getElementById('closeSuccessDialog');
    
    // Error dialog event listeners
    const errorDialog = document.getElementById('errorDialog');
    const tryAgain = document.getElementById('tryAgain');
    const closeErrorDialog = document.getElementById('closeErrorDialog');
    
    // Password dialog events
    if (submitPassword) {
        submitPassword.addEventListener('click', validatePassword);
    }
    
    if (cancelPassword) {
        cancelPassword.addEventListener('click', closePasswordDialogFunc);
    }
    
    if (closePasswordDialog) {
        closePasswordDialog.addEventListener('click', closePasswordDialogFunc);
    }
    
    // Success dialog events
    if (claimGift) {
        claimGift.addEventListener('click', openGiftLink);
    }
    
    if (cancelSuccess) {
        cancelSuccess.addEventListener('click', closeSuccessDialogFunc);
    }
    
    if (closeSuccessDialog) {
        closeSuccessDialog.addEventListener('click', closeSuccessDialogFunc);
    }
    
    // Error dialog events
    if (tryAgain) {
        tryAgain.addEventListener('click', closeErrorDialogFunc);
    }
    
    if (closeErrorDialog) {
        closeErrorDialog.addEventListener('click', closeErrorDialogFunc);
    }
    
    // Enter key support for password input
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                validatePassword();
            }
        });
    }
    
    // Ensure spaces are allowed in password input
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(e) {
            // Allow all keys including spaces
            if (e.key === ' ') {
                e.stopPropagation();
            }
        });
    }
}

function openGiftBox() {
    const passwordDialog = document.getElementById('passwordDialog');
    const passwordInput = document.getElementById('passwordInput');
    
    passwordDialog.style.display = 'block';
    passwordInput.focus();
}

function validatePassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;
    
    console.log('Password entered:', password);
    console.log('Password length:', password.length);
    console.log('Password trimmed:', password.trim());
    
    if (password.toLowerCase().trim() === "heebie jeebies") {
        closePasswordDialogFunc();
        showSuccessDialog();
    } else {
        closePasswordDialogFunc();
        showErrorDialog();
    }
}

function showSuccessDialog() {
    const successDialog = document.getElementById('successDialog');
    successDialog.style.display = 'block';
}

function showErrorDialog() {
    const errorDialog = document.getElementById('errorDialog');
    errorDialog.style.display = 'block';
}

function openGiftLink() {
    window.open("https://wise.com/claim/O_XzKKeCQJHY_kDh#QTG38HA9kZsZHj8ScDys", "_blank");
    closeSuccessDialogFunc();
}

function closePasswordDialogFunc() {
    const passwordDialog = document.getElementById('passwordDialog');
    const passwordInput = document.getElementById('passwordInput');
    passwordDialog.style.display = 'none';
    passwordInput.value = '';
}

function closeSuccessDialogFunc() {
    const successDialog = document.getElementById('successDialog');
    successDialog.style.display = 'none';
}

function closeErrorDialogFunc() {
    const errorDialog = document.getElementById('errorDialog');
    errorDialog.style.display = 'none';
}
