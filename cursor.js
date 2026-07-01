/* =============================================
   ANKIT KUMAR PORTFOLIO - CUSTOM CURSOR
   ============================================= */

(function() {
    'use strict';

    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (!dot || !outline) return;

    // Only show custom cursor on non-touch devices
    if ('ontouchstart' in window) {
        dot.style.display = 'none';
        outline.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let isHovering = false;

    // Cursor dot follows mouse instantly
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Cursor outline follows with lag (smooth)
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effects on interactive elements
    const interactiveSelectors = 'a, button, .btn, .filter-btn, .project-card, .cert-card, .glass-card, input, textarea, .theme-btn, .mobile-menu-btn, .back-to-top';

    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('cursor-hover');
            outline.classList.add('cursor-hover');
            isHovering = true;
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('cursor-hover');
            outline.classList.remove('cursor-hover');
            isHovering = false;
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        dot.classList.add('cursor-click');
        outline.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        dot.classList.remove('cursor-click');
        outline.classList.remove('cursor-click');
    });
})();
