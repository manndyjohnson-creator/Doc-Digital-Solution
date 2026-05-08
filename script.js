document.addEventListener('DOMContentLoaded', () => {
    // Contact Form AJAX Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerText;
            submitButton.innerText = 'Sending...';
            submitButton.disabled = true;

            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    contactForm.reset();
                    formStatus.style.display = 'block';
                    formStatus.innerText = 'Thanks for reaching out! We will get back to you shortly.';
                    formStatus.style.backgroundColor = 'rgba(0, 136, 204, 0.1)';
                    formStatus.style.color = 'var(--primary)';
                    formStatus.style.border = '1px solid var(--primary)';
                } else {
                    const responseData = await response.json();
                    let errors = responseData.errors ? responseData.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form.";
                    formStatus.style.display = 'block';
                    formStatus.innerText = errors;
                    formStatus.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                    formStatus.style.color = '#ff4444';
                    formStatus.style.border = '1px solid rgba(255, 0, 0, 0.3)';
                }
            } catch (error) {
                formStatus.style.display = 'block';
                formStatus.innerText = "Oops! There was a problem submitting your form.";
                formStatus.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                formStatus.style.color = '#ff4444';
                formStatus.style.border = '1px solid rgba(255, 0, 0, 0.3)';
            } finally {
                submitButton.innerText = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Trigger counter animation if it's the stats section
                if (entry.target.classList.contains('stats-container')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Counter Animation function
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
