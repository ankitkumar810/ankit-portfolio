/* =============================================
   ANKIT KUMAR PORTFOLIO - PARTICLES CONFIG
   ============================================= */

particlesJS('particles-js', {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 900
            }
        },
        color: {
            value: '#8B5CF6'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 0.8,
                opacity_min: 0.05,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: false
            }
        },
        line_linked: {
            enable: true,
            distance: 140,
            color: '#8B5CF6',
            opacity: 0.12,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 160,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
