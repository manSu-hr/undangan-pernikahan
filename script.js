/* ============================================
   Wedding Invitation - JavaScript
   Muhammad Deny & Esty Serihandayani
   Premium Modern Design
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // ============================================
    // Guest Name from URL Parameter
    // ============================================
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    const guestNameEl = document.getElementById('guestName');

    if (guestName && guestNameEl) {
        // Decode and display guest name
        guestNameEl.textContent = decodeURIComponent(guestName.replace(/\+/g, ' '));
        guestNameEl.style.display = 'block';
    } else if (guestNameEl) {
        guestNameEl.style.display = 'none';
    }

    // Elements
    const cover = document.getElementById('cover');
    const openBtn = document.getElementById('openBtn');
    const mainContent = document.getElementById('mainContent');
    const heroSection = document.getElementById('heroSection');
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    // Set initial state - hide scrollbar
    document.body.classList.add('no-scroll');

    // ============================================
    // Open Invitation - Scroll to First Section
    // ============================================
    openBtn.addEventListener('click', function () {
        // Hide cover with fade animation
        cover.classList.add('hidden');

        // Show main content
        setTimeout(() => {
            mainContent.classList.add('visible');
            document.body.classList.remove('no-scroll');

            // Scroll ke hero section (bagian pertama)
            setTimeout(() => {
                heroSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

            // Auto-play music after user interaction
            playMusic();

            // Refresh AOS animations
            AOS.refresh();
        }, 600);
    });

    // ============================================
    // Music Control
    // ============================================
    let isPlaying = false;

    function playMusic() {
        bgMusic.volume = 0.4; // 40% volume

        // Try to play music
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="fas fa-pause"></i><span class="music-pulse"></span>';
            }).catch(error => {
                console.log('Autoplay blocked:', error);
                isPlaying = false;
                musicBtn.innerHTML = '<i class="fas fa-play"></i><span class="music-pulse"></span>';
            });
        }
    }

    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-play"></i><span class="music-pulse"></span>';
    }

    musicBtn.addEventListener('click', function () {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // ============================================
    // Countdown Timer
    // ============================================
    // Tanggal pernikahan: 28 Desember 2025
    const weddingDate = new Date('2025-12-28T10:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Update elements langsung
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Hari H sudah lewat
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            const label = document.querySelector('.countdown-label');
            if (label) label.textContent = 'Hari Bahagia Telah Tiba! 💕';
        }
    }

    // Update countdown setiap detik
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============================================
    // WhatsApp Wishes Form
    // ============================================
    const wishesForm = document.getElementById('wishesForm');
    const phoneNumber = '6281337062413'; // Tanpa + dan spasi

    wishesForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const senderName = document.getElementById('senderName').value.trim();
        const wishMessage = document.getElementById('wishMessage').value.trim();

        if (senderName && wishMessage) {
            // Format pesan WhatsApp
            const message = encodeURIComponent(
                `*🎊 Ucapan Pernikahan*\n` +
                `*Muhammad Deny & Esty Serihandayani*\n\n` +
                `Dari: *${senderName}*\n\n` +
                `${wishMessage}\n\n` +
                `────────────\n` +
                `_Dikirim melalui Undangan Digital_`
            );

            // Buka WhatsApp dengan pesan
            const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(waUrl, '_blank');

            // Reset form
            wishesForm.reset();

            // Show success toast
            showToast('✅ Mengarahkan ke WhatsApp...');
        }
    });

    // ============================================
    // Toast Notification
    // ============================================
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        // Create toast
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;

        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
            color: '#0D0D0D',
            padding: '16px 32px',
            borderRadius: '50px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)',
            zIndex: '99999',
            opacity: '0',
            transition: 'all 0.4s ease'
        });

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // ============================================
    // Smooth Scroll for Navigation
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // Parallax Effect on Scroll
    // ============================================
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Parallax for hero background
        const heroBg = document.querySelector('.hero-bg-image');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }

        // Parallax for closing background
        const closingBg = document.querySelector('.closing-bg');
        if (closingBg) {
            const closingSection = document.querySelector('.closing-section');
            const rect = closingSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                closingBg.style.transform = `translateY(${(rect.top - window.innerHeight) * 0.2}px)`;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ============================================
    // Image Loading Animation
    // ============================================
    const images = document.querySelectorAll('.mempelai-photo, .gallery-frame img');

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.onload = function () {
                this.style.opacity = '1';
            };
        }
    });

    // ============================================
    // Add Floating Hearts Animation
    // ============================================
    function createFloatingHeart() {
        const sections = ['.mempelai-pria', '.mempelai-wanita'];

        sections.forEach(sectionClass => {
            const section = document.querySelector(sectionClass);
            if (!section || !isInViewport(section)) return;

            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 10 + 10}px;
                color: rgba(212, 175, 55, ${Math.random() * 0.3 + 0.2});
                left: ${Math.random() * 100}%;
                bottom: 0;
                pointer-events: none;
                animation: floatHeart ${Math.random() * 3 + 4}s ease-out forwards;
                z-index: 1;
            `;

            section.appendChild(heart);

            setTimeout(() => heart.remove(), 7000);
        });
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }

    // Add floating heart animation CSS
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        @keyframes floatHeart {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-300px) rotate(45deg) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartStyle);

    // Create hearts periodically
    setInterval(createFloatingHeart, 3000);

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c💕 Wedding Invitation 💕', 'font-size: 20px; color: #D4AF37;');
    console.log('%cMuhammad Deny & Esty Serihandayani', 'font-size: 14px; color: #B8860B;');
    console.log('%c28 Desember 2025', 'font-size: 12px; color: #888;');
});
