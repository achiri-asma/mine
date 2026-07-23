// ======================================================
// --- GLOBAL FUNCTIONS CHO COMPONENTS ---
// ======================================================

// 0.1 Animation Observer
window.initScrollAnimations = function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
};

// 0.2 Active Menu Highlight
window.highlightActiveMenu = function() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('main section');

    function moveIndicator(targetLink) {
        if (!navIndicator) return;
        if (!targetLink) {
            navIndicator.style.opacity = '0';
            return;
        }
        const linkRect = targetLink.getBoundingClientRect();
        const navRect = targetLink.parentElement.getBoundingClientRect();

        navIndicator.style.width = `${linkRect.width}px`;
        navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        navIndicator.style.opacity = '1';

        navLinks.forEach(link => link.classList.remove('is-active'));
        targetLink.classList.add('is-active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => moveIndicator(e.currentTarget));
    });

    const navSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`) || 
                                         document.querySelector(`.main-nav a[href="index.html#${sectionId}"]`);
                moveIndicator(correspondingLink);
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });

    sections.forEach(section => navSectionObserver.observe(section));
    
    // Check current page for non-index pages
    const currentPath = window.location.pathname;
    if (currentPath.includes('project.html')) {
        moveIndicator(document.querySelector('.main-nav a[href="project.html"]'));
    } else if (currentPath.includes('blog.html')) {
        moveIndicator(document.querySelector('.main-nav a[href="blog.html"]'));
    } else if (currentPath.includes('download-resume.html')) {
        const resumeBtn = document.querySelector('.resume-button');
        if (resumeBtn) {
            resumeBtn.classList.add('is-active');
            moveIndicator(null); // Hide indicator for resume button as it's outside the nav
        }
    }
};

// 0.3 Theme Toggle
window.initThemeToggle = function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }

    if (themeToggleBtn) {
        const newBtn = themeToggleBtn.cloneNode(true);
        themeToggleBtn.parentNode.replaceChild(newBtn, themeToggleBtn);

        newBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode');
        });
    }
};



// 0.5 Parallax Effect for Hero
window.initParallax = function() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const heroBg = hero.querySelector('.hero-background');
    const profileCard = hero.querySelector('.profile-card-container');
    const heroText = hero.querySelector('.hero-text-content');
    const shapes = hero.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (scrolled <= hero.offsetHeight) {
            // Background moves slower (0.4 speed)
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
            
            // Profile card moves slightly faster (0.15 speed)
            if (profileCard) {
                profileCard.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
            
            // Hero text moves slightly slower than scroll (0.1 speed)
            if (heroText) {
                heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
            }

            // Decorative shapes move at different speeds
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }, { passive: true });
};

// ======================================================
// --- MAIN LOGIC ---
// ======================================================
document.addEventListener('DOMContentLoaded', () => {

    // Khởi tạo các logic cơ bản
    window.initScrollAnimations();
    window.highlightActiveMenu();
    window.initThemeToggle();
    window.initParallax();

    // 1. Header & Progress Bar Logic
    const header = document.querySelector('.main-header');
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 100) header.classList.add('visible');
            else header.classList.remove('visible');
        }
        if (progressBar) {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        }
    });


});