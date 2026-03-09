// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Smooth scrolling
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CONTACT FORM → GOOGLE SHEETS
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {

        contactForm.addEventListener('submit', function(e) {

            e.preventDefault();

            const formData = new FormData(this);

            const data = Object.fromEntries(formData.entries());

            fetch("https://script.google.com/macros/s/AKfycbzgc5HFCxsvS2C11OJiOc4OGtW5LwP-_mN8P-FthZ71TSZ-yEyDiZJuCVGkYNEaxGb_/exec", {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(() => {
                alert("Project request submitted successfully!");
                contactForm.reset();
            })
            .catch(error => {
                alert("Something went wrong. Please try again.");
                console.error(error);
            });

        });

    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {

        button.addEventListener('click', function() {

            filterButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {

                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }

            });

        });

    });

    // Scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }

        });

    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .team-member, .pricing-card, .feature-card, .process-step, .testimonial-card'
    );

    animateElements.forEach(el => observer.observe(el));

    // Card hover effects
    const cards = document.querySelectorAll(
        '.service-card, .team-member, .pricing-card, .feature-card, .process-step, .testimonial-card, .service-card-full'
    );

    cards.forEach(card => {

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

    });

    // Active navigation highlighting
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {

        const href = link.getAttribute('href');

        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }

    });

    // Image loading animation
    const images = document.querySelectorAll('img');

    images.forEach(img => {

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');

    scrollToTopBtn.innerHTML = '↑';

    scrollToTopBtn.className = 'scroll-top-btn';

    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
    `;

    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });

    window.addEventListener('scroll', () => {

        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

    });

});

// Animation helper
function animateOnScroll() {

    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {

        const elementPosition = element.getBoundingClientRect().top;

        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {

            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';

        }

    });

}

window.addEventListener('scroll', animateOnScroll);
