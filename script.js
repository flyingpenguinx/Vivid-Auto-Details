// ============================================
// VIVID AUTO DETAILS - OPTION 3
// Minimalist Design with Scroll Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CURTAIN REVEAL ANIMATION
    // ============================================
    const curtainReveal = document.getElementById('curtainReveal');
    
    // Check if we should skip the intro animation
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get('skipIntro') === 'true';
    
    if (curtainReveal) {
        if (skipIntro) {
            // Skip animation - hide immediately
            curtainReveal.classList.add('open');
            curtainReveal.style.display = 'none';
        } else {
            // Play animation normally
            setTimeout(() => {
                curtainReveal.classList.add('open');
            }, 2000);
            
            // Remove curtain from DOM after animation
            setTimeout(() => {
                curtainReveal.style.display = 'none';
            }, 3500);
        }
    }
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    const heroBottom = document.querySelector('.hero-bottom');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide scroll indicator when scrolling
        if (heroBottom) {
            if (window.scrollY > 50) {
                heroBottom.classList.add('hidden');
            } else {
                heroBottom.classList.remove('hidden');
            }
        }
    });
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements after curtain animation completes
    setTimeout(() => {
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
        
        // Trigger visible for elements already in view
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 2500);
    
    // ============================================
    // ACTIVE NAV LINK
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Add active state styling
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-link.active {
            color: var(--red);
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);
    
    // ============================================
    // FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-submit');
            const originalContent = btn.innerHTML;
            
            // Show success state
            btn.innerHTML = '<span>Message Sent!</span>';
            btn.style.background = '#10b981';
            
            // Reset form
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
            }, 3000);
        });
    }
    
    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const heroImg = document.querySelector('.hero-img');
    
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            if (heroImg && scrolled < window.innerHeight) {
                heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
            }
        }
    });
    
    // ============================================
    // SERVICE CARD HOVER EFFECTS
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            serviceCards.forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.6';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            serviceCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // ============================================
    // GALLERY LIGHTBOX EFFECT
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Simple scale effect on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // ============================================
    // MEGA NAVIGATION
    // ============================================
    const menuTrigger = document.getElementById('menuTrigger');
    const megaNav = document.getElementById('megaNav');
    const megaNavClose = document.getElementById('megaNavClose');
    const megaNavLinks = document.querySelectorAll('.mega-nav-link');
    let isClosing = false;
    
    function openNav() {
        if (megaNav) {
            megaNav.classList.remove('closing');
            megaNav.classList.add('active');
            if (menuTrigger) menuTrigger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeNav() {
        if (megaNav) {
            isClosing = true;
            megaNav.classList.add('closing');
            if (menuTrigger) menuTrigger.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                megaNav.classList.remove('active', 'closing');
                isClosing = false;
            }, 700);
        }
    }
    
    if (menuTrigger) {
        menuTrigger.addEventListener('click', () => {
            if (isClosing) return;
            
            if (megaNav.classList.contains('active')) {
                closeNav();
            } else {
                openNav();
            }
        });
    }
    
    // Close button click
    if (megaNavClose) {
        megaNavClose.addEventListener('click', () => {
            if (!isClosing) {
                closeNav();
            }
        });
    }
    
    // Close nav when clicking a link
    megaNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });
    
    // Close nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && megaNav && megaNav.classList.contains('active')) {
            closeNav();
        }
    });
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // ============================================
    // GALLERY FILTER (for gallery page)
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryFullItems = document.querySelectorAll('.gallery-full-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter gallery items
            galleryFullItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ============================================
    // FAQ CATEGORY NAVIGATION
    // ============================================
    const faqCategoryLinks = document.querySelectorAll('.faq-categories a');
    
    faqCategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            faqCategoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = 100;
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
});

