document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillSection = document.querySelector('#skills');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const target = bar.getAttribute('data-progress');
            bar.style.width = target + '%';
            
            // Animate percentage text
            const percentageText = bar.parentElement.previousElementSibling.querySelector('.skill-percentage');
            let current = 0;
            const increment = target / 50; // Smooth animation over 50 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    percentageText.textContent = target + '%';
                    clearInterval(timer);
                } else {
                    percentageText.textContent = Math.floor(current) + '%';
                }
            }, 20);
        });
    };

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillSection) {
        observer.observe(skillSection);
    }
});
