// ============================================
// VIVID AUTO DETAILS - COMPLETE WORKING SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // DETECT DEVICE TYPE (MUST BE FIRST)
    // ============================================
    const isMobile = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ============================================
    // HERO VIDEO AUTOPLAY - SMART MOBILE HANDLING
    // ============================================
    const heroVideoDesktop = document.querySelector('.hero-video-desktop');
    const heroVideoMobile = document.querySelector('.hero-video-mobile');
    const heroImg = document.querySelector('.hero-img');
    
    // Get the correct video for this device
    const activeVideo = isMobile ? heroVideoMobile : heroVideoDesktop;
    
    function playActiveVideo() {
        if (!activeVideo) return;
        
        // Ensure attributes are set
        activeVideo.muted = true;
        activeVideo.playsInline = true;
        activeVideo.setAttribute('playsinline', '');
        activeVideo.setAttribute('webkit-playsinline', '');
        
        const playPromise = activeVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video is playing - hide fallback image
                if (heroImg) heroImg.style.opacity = '0';
                console.log('Video playing successfully');
            }).catch((e) => {
                console.log('Video play failed, will retry on interaction:', e.message);
            });
        }
    }
    
    // For mobile: More aggressive autoplay strategy
    if (isMobile && activeVideo) {
        // Try immediately
        playActiveVideo();
        
        // Try again after a short delay (after page settles)
        setTimeout(playActiveVideo, 100);
        setTimeout(playActiveVideo, 500);
        setTimeout(playActiveVideo, 1000);
        
        // Use IntersectionObserver to play when video is visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playActiveVideo();
                }
            });
        }, { threshold: 0.1 });
        videoObserver.observe(activeVideo);
        
        // Also try on ANY user interaction
        const interactionEvents = ['touchstart', 'touchend', 'click', 'scroll', 'touchmove'];
        const onFirstInteraction = () => {
            playActiveVideo();
            // Remove all listeners after first successful interaction
            interactionEvents.forEach(evt => {
                document.removeEventListener(evt, onFirstInteraction);
            });
        };
        interactionEvents.forEach(evt => {
            document.addEventListener(evt, onFirstInteraction, { passive: true });
        });
        
    } else if (activeVideo) {
        // Desktop: Simple autoplay (usually works fine)
        playActiveVideo();
    }

    // ============================================
    // CURTAIN REVEAL ANIMATION - SKIP ON MOBILE
    // ============================================
    const curtainReveal = document.getElementById('curtainReveal');
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get('skipIntro') === 'true';
    const hasNoCurtain = document.body.classList.contains('no-curtain');

    function showAllContent() {
        document.querySelectorAll('.reveal-text, .reveal-card').forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    function removeCurtain() {
        if (curtainReveal) {
            curtainReveal.style.opacity = '0';
            curtainReveal.style.visibility = 'hidden';
            curtainReveal.style.pointerEvents = 'none';
            setTimeout(() => curtainReveal.remove(), 300);
        }
        showAllContent();
        // Try to play video after curtain is removed
        playActiveVideo();
    }

    // Skip curtain on mobile for faster load and better video autoplay
    if (isMobile) {
        if (curtainReveal) curtainReveal.remove();
        showAllContent();
    } else if (curtainReveal && !hasNoCurtain && !skipIntro) {
        // Desktop: Show curtain animation (original timing)
        setTimeout(() => curtainReveal.classList.add('open'), 100);
        setTimeout(removeCurtain, 3000);
        setTimeout(removeCurtain, 5000); // Failsafe
    } else {
        if (curtainReveal) curtainReveal.remove();
        showAllContent();
    }

    // ============================================
    // HEADER SCROLL EFFECT (STICKY NAV)
    // ============================================
    const header = document.getElementById('header');
    const heroBottom = document.querySelector('.hero-bottom');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        if (heroBottom) {
            if (scrollY > 30) {
                heroBottom.classList.add('hidden');
            } else {
                heroBottom.classList.remove('hidden');
            }
        }
    }
    
    // Initial check on page load
    handleScroll();
    
    // Throttled scroll listener for performance
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                handleScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    let scrollPosition = 0;
    
    function openMobileMenu() {
        if (!mobileToggle || !mobileMenu) return;
        
        scrollPosition = window.scrollY;
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPosition}px`;
    }
    
    function closeMobileMenu() {
        if (!mobileToggle || !mobileMenu) return;
        
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ============================================
    // MEGA NAVIGATION (Desktop Full-Screen Nav)
    // ============================================
    const menuTrigger = document.getElementById('menuTrigger');
    const megaNav = document.getElementById('megaNav');
    const megaNavClose = document.getElementById('megaNavClose');
    const megaNavLinks = document.querySelectorAll('.mega-nav-link');
    let isNavClosing = false;
    
    function openMegaNav() {
        if (!megaNav) return;
        
        megaNav.classList.remove('closing');
        megaNav.classList.add('active');
        if (menuTrigger) menuTrigger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMegaNav() {
        if (!megaNav || isNavClosing) return;
        
        isNavClosing = true;
        megaNav.classList.add('closing');
        if (menuTrigger) menuTrigger.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            megaNav.classList.remove('active', 'closing');
            isNavClosing = false;
        }, 700);
    }
    
    if (menuTrigger) {
        menuTrigger.addEventListener('click', () => {
            if (isNavClosing) return;
            
            if (megaNav && megaNav.classList.contains('active')) {
                closeMegaNav();
            } else {
                openMegaNav();
            }
        });
    }
    
    if (megaNavClose) {
        megaNavClose.addEventListener('click', closeMegaNav);
    }
    
    megaNavLinks.forEach(link => {
        link.addEventListener('click', closeMegaNav);
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = isMobile ? 70 : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
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
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Start observing after curtain animation completes
        const observeDelay = (hasNoCurtain || skipIntro || !curtainReveal) ? 100 : 2800;
        setTimeout(() => {
            revealElements.forEach(el => {
                if (!el.classList.contains('visible')) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.classList.add('visible');
                    } else {
                        revealObserver.observe(el);
                    }
                }
            });
        }, observeDelay);
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach(el => {
            el.classList.add('visible');
        });
    }

    // ============================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href.includes('#' + sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // ============================================
    // PARALLAX EFFECT (Desktop Only)
    // ============================================
    if (!isMobile && !isTouchDevice) {
        const heroImg = document.querySelector('.hero-img');
        
        if (heroImg) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    heroImg.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.1) + 'px)';
                }
            }, { passive: true });
        }
    }

    // ============================================
    // SERVICE CARDS HOVER EFFECT (Desktop Only)
    // ============================================
    if (!isMobile) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                serviceCards.forEach(c => {
                    if (c !== this) c.style.opacity = '0.7';
                });
            });
            
            card.addEventListener('mouseleave', function() {
                serviceCards.forEach(c => {
                    c.style.opacity = '1';
                });
            });
        });
    }

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
                
                item.classList.toggle('active');
            });
        }
    });

    // ============================================
    // GALLERY FILTER
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-full-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
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
            
            faqCategoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = isMobile ? 80 : 100;
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SERVICE NAV SMOOTH SCROLL
    // ============================================
    const serviceNavItems = document.querySelectorAll('.service-nav-item');
    
    serviceNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                const offset = isMobile ? 70 : 90;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ESCAPE KEY - CLOSE ALL MENUS
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (megaNav && megaNav.classList.contains('active')) {
                closeMegaNav();
            }
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // ============================================
    // QUOTE FORM HANDLING
    // ============================================
    const quoteForms = document.querySelectorAll('.quote-form');

    function getFieldValue(form, selector) {
        const field = form.querySelector(selector);
        return field ? field.value.trim() : '';
    }

    function getSelectedServiceLabels(form) {
        const services = [];
        const checkedBoxes = form.querySelectorAll('input[name="services"]:checked');

        checkedBoxes.forEach((checkbox) => {
            const label = checkbox.closest('label');
            const spanLabels = label ? Array.from(label.querySelectorAll('span')) : [];
            const displayLabel = spanLabels
                .map((span) => span.textContent.trim())
                .filter(Boolean)
                .pop();

            services.push(displayLabel || checkbox.value);
        });

        return services;
    }

    function buildLegacyQuotePayload(form) {
        const fullName = getFieldValue(form, '#name');
        const nameParts = fullName ? fullName.split(/\s+/).filter(Boolean) : [];
        const firstName = getFieldValue(form, '#firstName') || (nameParts[0] || '');
        const lastName = getFieldValue(form, '#lastName') || (nameParts.slice(1).join(' ') || '');
        const vehicleYear = getFieldValue(form, '#vehicle-year');
        const vehicleMake = getFieldValue(form, '#vehicle-make');
        const vehicleModel = getFieldValue(form, '#vehicle-model');

        return {
            firstName,
            lastName,
            email: getFieldValue(form, '#email'),
            phone: getFieldValue(form, '#phone'),
            vehicle: getFieldValue(form, '#vehicle') || [vehicleYear, vehicleMake, vehicleModel].filter(Boolean).join(' ').trim(),
            services: getSelectedServiceLabels(form),
            message: getFieldValue(form, '#message'),
            timestamp: new Date().toISOString()
        };
    }

    function buildQuotePayload(form) {
        const homepageFirstName = getFieldValue(form, '#firstName');
        const homepageLastName = getFieldValue(form, '#lastName');
        const enteredFullName = getFieldValue(form, '#name') || [homepageFirstName, homepageLastName].filter(Boolean).join(' ').trim();
        const nameParts = enteredFullName ? enteredFullName.split(/\s+/).filter(Boolean) : [];
        const firstName = homepageFirstName || (nameParts[0] || '');
        const lastName = homepageLastName || (nameParts.slice(1).join(' ') || '');
        const fullName = enteredFullName || [firstName, lastName].filter(Boolean).join(' ').trim();
        const vehicleYear = getFieldValue(form, '#vehicle-year');
        const vehicleMake = getFieldValue(form, '#vehicle-make');
        const vehicleModel = getFieldValue(form, '#vehicle-model');
        const vehicleColor = getFieldValue(form, '#vehicle-color');
        const vehicleDisplay = getFieldValue(form, '#vehicle') || [vehicleYear, vehicleMake, vehicleModel].filter(Boolean).join(' ').trim();
        const services = getSelectedServiceLabels(form);
        const timestamp = new Date().toISOString();

        return {
            firstName,
            lastName,
            name: fullName,
            fullName,
            email: getFieldValue(form, '#email'),
            phone: getFieldValue(form, '#phone'),
            preferredContact: getFieldValue(form, '#preferred-contact'),
            vehicle: vehicleDisplay,
            vehicleYear,
            vehicleMake,
            vehicleModel,
            vehicleColor,
            services,
            message: getFieldValue(form, '#message'),
            sourcePage: window.location.pathname.split('/').pop() || 'index.html',
            formVariant: form.dataset.quoteVariant || 'default',
            timestamp,
            canonical: {
                contact: {
                    firstName,
                    lastName,
                    fullName,
                    email: getFieldValue(form, '#email'),
                    phone: getFieldValue(form, '#phone'),
                    preferredContact: getFieldValue(form, '#preferred-contact')
                },
                vehicle: {
                    display: vehicleDisplay,
                    year: vehicleYear,
                    make: vehicleMake,
                    model: vehicleModel,
                    color: vehicleColor
                },
                services,
                message: getFieldValue(form, '#message'),
                sourcePage: window.location.pathname.split('/').pop() || 'index.html',
                formVariant: form.dataset.quoteVariant || 'default',
                timestamp
            }
        };
    }

    function buildBridgeQuotePayload(form) {
        const quotePayload = buildQuotePayload(form);

        return {
            firstName: quotePayload.firstName,
            lastName: quotePayload.lastName,
            name: quotePayload.fullName || quotePayload.name,
            email: quotePayload.email,
            phone: quotePayload.phone,
            vehicle: quotePayload.vehicle,
            preferred_date: getFieldValue(form, '#preferred-date') || getFieldValue(form, '#preferred_date'),
            message: quotePayload.message,
            services: quotePayload.services,
            service_requested: quotePayload.services.join(', ')
        };
    }

    function submitBridgeQuote(form) {
        const bridge = window.Cielonline;

        if (!bridge || typeof bridge.submitInquiry !== 'function') {
            return Promise.resolve(null);
        }

        return bridge.submitInquiry(buildBridgeQuotePayload(form));
    }

    quoteForms.forEach((quoteForm) => {
        const formSuccess = quoteForm.parentElement ? quoteForm.parentElement.querySelector('.form-success') : null;
        let formSubmitted = false;

        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (formSubmitted) return;

            const honeypot = quoteForm.querySelector('#website');
            if (honeypot && honeypot.value !== '') {
                quoteForm.style.display = 'none';
                if (formSuccess) formSuccess.style.display = 'block';
                return;
            }

            if (!quoteForm.reportValidity()) {
                return;
            }

            const selectedServices = quoteForm.querySelectorAll('input[name="services"]:checked');
            if (selectedServices.length === 0) {
                alert('Please select at least one service you are interested in.');
                return;
            }

            const submitBtn = quoteForm.querySelector('.btn-submit');
            if (!submitBtn) {
                return;
            }

            const originalText = submitBtn.innerHTML;
            formSubmitted = true;
            submitBtn.innerHTML = '<span>Sending...</span><svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>';
            submitBtn.disabled = true;

            try {
                const endpoint = quoteForm.dataset.quoteEndpoint || quoteForm.dataset.googleScript;
                const requestMode = quoteForm.dataset.quoteMode || (quoteForm.dataset.googleScript ? 'no-cors' : 'cors');
                const isLegacyGoogleScript = Boolean(quoteForm.dataset.googleScript) && endpoint === quoteForm.dataset.googleScript;
                const payload = isLegacyGoogleScript ? buildLegacyQuotePayload(quoteForm) : buildQuotePayload(quoteForm);

                if (!endpoint) {
                    throw new Error('Quote endpoint is not configured.');
                }

                console.log('Submitting quote payload:', payload);

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                };

                if (requestMode === 'no-cors') {
                    requestOptions.mode = 'no-cors';
                }

                const response = await fetch(endpoint, requestOptions);

                if (requestMode !== 'no-cors' && !response.ok) {
                    throw new Error('Quote request failed with status ' + response.status);
                }

                submitBridgeQuote(quoteForm).catch((bridgeError) => {
                    console.warn('Bridge quote submission failed after legacy submit succeeded:', bridgeError);
                });

                console.log('Quote submitted successfully');
                quoteForm.style.display = 'none';

                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    if (isMobile) {
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            } catch (error) {
                formSubmitted = false;
                console.error('Form submission error:', error);
                alert('There was an error sending your request. Please try again or email us directly at vividautodetailsca@gmail.com');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });

    // ============================================
    // CONTACT FORM HANDLING (if exists)
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-submit');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<span>Message Sent!</span>';
            btn.style.background = '#10b981';
            
            this.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
            }, 3000);
        });
    }

    // ============================================
    // DONE - LOG SUCCESS
    // ============================================
    console.log('Vivid Auto Details - All scripts loaded successfully');

});

// ============================================
// HANDLE PAGE VISIBILITY
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});

