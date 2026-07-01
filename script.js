/* =============================================
   ANKIT KUMAR PORTFOLIO - MAIN SCRIPT
   ============================================= */

'use strict';

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initThemeToggle();
    initTypingAnimation();
    initScrollReveal();
    initScrollProgress();
    initCounters();
    initSkillBars();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initMobileMenu();
    initTiltEffect();
    initButtonRipple();
    initSmoothScroll();
});

/* ---- Loader ---- */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            // Trigger hero animations after loader
            document.querySelectorAll('.hero .reveal-up, .hero .reveal-scale').forEach(el => {
                el.classList.add('visible');
            });
        }, 800);
    });

    document.body.style.overflow = 'hidden';
}

/* ---- Navbar ---- */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

/* ---- Theme Toggle ---- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }
}

/* ---- Typing Animation ---- */
function initTypingAnimation() {
    const typingEl = document.querySelector('.typing-text');
    if (!typingEl) return;

    const texts = [
        'Software Development Engineer',
        'Full Stack Developer',
        'DSA Problem Solver',
        'Open Source Contributor'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1200);
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        // Skip hero elements (handled by loader)
        if (!el.closest('#hero')) {
            observer.observe(el);
        }
    });
}

/* ---- Scroll Progress ---- */
function initScrollProgress() {
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        document.documentElement.style.setProperty('--scroll-progress', progress + '%');
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
}

/* ---- Animated Counters ---- */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(el, target) {
        const duration = 1800;
        const start = performance.now();

        function update(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            const current = Math.round(eased * target);
            el.textContent = current + (target >= 100 ? '+' : '');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target + '+';
            }
        }

        requestAnimationFrame(update);
    }
}

/* ---- Skill Bars ---- */
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    if (!progressBars.length) return;

    const observerOptions = { threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0';

                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);

                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0';
        observer.observe(bar);
    });
}

/* ---- Project Filter ---- */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.filter-item');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fade-in-up 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ---- Contact Form ---- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.submit-btn');
        const originalContent = btn.innerHTML;

        // Simulate sending
        btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);
    });
}

/* ---- Back to Top ---- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!menuBtn) return;

    // Create mobile nav overlay
    const mobileNav = document.createElement('div');
    mobileNav.className = 'nav-mobile';
    mobileNav.innerHTML = `
        <button class="nav-close" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
    `;
    document.body.appendChild(mobileNav);

    menuBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    mobileNav.querySelector('.nav-close').addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ---- Tilt Effect ---- */
function initTiltEffect() {
    if (typeof VanillaTilt === 'undefined') return;

    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.1,
        scale: 1.02
    });
}

/* ---- Button Ripple ---- */
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ---- Cursor CSS Injection ---- */
(function injectCursorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: #8B5CF6;
            border-radius: 50%;
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        }

        .cursor-outline {
            width: 36px;
            height: 36px;
            border: 2px solid rgba(139, 92, 246, 0.5);
            border-radius: 50%;
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 99998;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        }

        .cursor-dot.cursor-hover {
            transform: translate(-50%, -50%) scale(2);
            background: rgba(139, 92, 246, 0.5);
        }

        .cursor-outline.cursor-hover {
            transform: translate(-50%, -50%) scale(1.5);
            border-color: rgba(139, 92, 246, 0.8);
        }

        .cursor-dot.cursor-click {
            transform: translate(-50%, -50%) scale(0.8);
        }

        .cursor-outline.cursor-click {
            transform: translate(-50%, -50%) scale(0.8);
        }

        .nav-links a.active {
            color: #A78BFA;
        }

        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
})();
