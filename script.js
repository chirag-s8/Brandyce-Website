/**
 * Brandyce Website - Main Interactions Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Header Background on Scroll
    const header = document.querySelector('header');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Check initial scroll position
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);

    // Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Handle Contact Buttons Click (Feedback)
    const socialBtns = document.querySelectorAll('.btn-whatsapp, .btn-instagram');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Let the default link behavior happen (open in new tab), 
            // but add a subtle interaction effect if desired
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);
        });
    });

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only run if cursors exist and we are on desktop
    if (cursorDot && cursorOutline && window.matchMedia("(min-width: 768px)").matches) {
        
        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Instantly move dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Add slight easing to the outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .glass-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 3D Tilt Effect on Glass Cards
    const cards = document.querySelectorAll('.glass-card');
    
    // Only apply complex animations on desktop
    if (window.matchMedia("(min-width: 768px)").matches) {
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                
                // Calculate position of mouse inside the element
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate percentages (0 to 1)
                const xPercent = x / rect.width;
                const yPercent = y / rect.height;
                
                // Convert percentages to rotation degrees (-10deg to +10deg)
                // When mouse is top-left, we want negative rotations
                const maxRotation = 10;
                const rotateX = maxRotation * (0.5 - yPercent); // vertical tilt
                const rotateY = maxRotation * (xPercent - 0.5); // horizontal tilt
                
                // Construct the transform string
                // We add a slight scale and the 3d rotation
                card.style.transform = `perspective(1000px) translateY(-5px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // Reset when leaving card
            card.addEventListener("mouseleave", () => {
                card.style.transform = `perspective(1000px) translateY(0) scale(1) rotateX(0deg) rotateY(0deg)`;
                // Small transition delay so it smoothly resets
                card.style.transition = "transform 0.5s ease-out, background 0.3s, border-color 0.3s, box-shadow 0.3s";
                
                setTimeout(() => {
                    card.style.transition = "background 0.3s, border-color 0.3s, box-shadow 0.3s";
                }, 500);
            });
            
            // Remove transition when hovering so it tracks mouse instantly
            card.addEventListener("mouseenter", () => {
                card.style.transition = "background 0.3s, border-color 0.3s, box-shadow 0.3s";
            });
        });
    }

    // Parallax scrolling for Hero section background (only index.html has .hero)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            // Move background slightly down as you scroll
            heroSection.style.backgroundPosition = `center ${scrollPos * 0.4}px`;
        });
    }
});
