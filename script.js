document.addEventListener('DOMContentLoaded', function() {
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
            
            setTimeout(() => {
                cursorOutline.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
            }, 50);
        });
        
        const hoverElements = document.querySelectorAll('a, button, .btn, .focus-card, .team-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = '#ffd700';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = '#00c9a7';
            });
        });
    }
    
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                if (navToggle.querySelector('i')) {
                    navToggle.querySelector('i').classList.add('fa-bars');
                    navToggle.querySelector('i').classList.remove('fa-times');
                }
            });
        });
    }
    
    const sections = document.querySelectorAll('section');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const triggerBottom = window.innerHeight * 0.8;
        const statsSection = document.querySelector('.hero-stats');
        
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, stepTime);
                });
                animated = true;
            }
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
    const revealElements = document.querySelectorAll('.focus-card, .team-card, .publication-item, .about-content, .about-image');
    
    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.innerHTML = '<span style="color: #ff6b6b;">Please fill in all required fields.</span>';
                }
                return;
            }
            
            if (!isValidEmail(email)) {
                if (formStatus) {
                    formStatus.innerHTML = '<span style="color: #ff6b6b;">Please enter a valid email address.</span>';
                }
                return;
            }
            
            if (formStatus) {
                formStatus.innerHTML = '<span style="color: #00c9a7;">Sending message...</span>';
            }
            
            setTimeout(() => {
                if (formStatus) {
                    formStatus.innerHTML = '<span style="color: #00c9a7;">Message sent successfully! We\'ll get back to you soon.</span>';
                }
                contactForm.reset();
                
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.innerHTML = '';
                    }
                }, 5000);
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
    
    const cards = document.querySelectorAll('.focus-card, .team-card, .publication-item');
    
    function updateGlassEffect() {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.style.backdropFilter = 'blur(10px)';
            }
        });
    }
    
    window.addEventListener('scroll', updateGlassEffect);
    updateGlassEffect();
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.innerHTML;
    }
    
    console.log('Athena SynCognition Lab website loaded successfully!');
});