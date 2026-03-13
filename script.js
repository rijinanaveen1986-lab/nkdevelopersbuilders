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
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
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

    // FORM SUBMISSION → GOOGLE SHEETS
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {

        contactForm.addEventListener('submit', function(e) {

            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            fetch("https://script.google.com/macros/s/AKfycbzgc5HFCxsvS2C11OJiOc4OGtW5LwP-_mN8P-FthZ71TSZ-yEyDiZJuCVGkYNEaxGb_/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(() => {

                const successBox = document.createElement("div");

                successBox.innerHTML = `
                    <div style="
                        position:fixed;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%) scale(0.8);
                        background:white;
                        padding:30px;
                        border-radius:12px;
                        box-shadow:0 10px 40px rgba(0,0,0,0.2);
                        text-align:center;
                        z-index:9999;
                        opacity:0;
                        transition:all 0.4s ease;
                        max-width:320px;
                    ">
                        <h3 style="color:#2ecc71;">✔ Request Submitted</h3>
                        <p style="font-size:14px;color:#555;margin-top:10px;">
                        Your project details were uploaded successfully.<br>
                        Our team will contact you soon.
                        </p>
                    </div>
                `;

                document.body.appendChild(successBox);

                const box = successBox.firstElementChild;

                setTimeout(()=>{
                    box.style.opacity = "1";
                    box.style.transform = "translate(-50%,-50%) scale(1)";
                },50);

                setTimeout(()=>{
                    box.style.opacity = "0";
                    box.style.transform = "translate(-50%,-50%) scale(0.9)";
                    setTimeout(()=> successBox.remove(),400);
                },3000);

                contactForm.reset();

            })
            .catch(error => {

                alert("Submission failed. Please try again.");
                console.error(error);

            });

        });

    }

    // Scroll animations
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

    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .pricing-card');

    animateElements.forEach(el => observer.observe(el));

    // Hover effects
    const cards = document.querySelectorAll('.service-card, .team-member, .pricing-card');

    cards.forEach(card => {

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

    });

    // Active navigation highlight
    const currentPath = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.nav-menu a');

    menuLinks.forEach(link => {

        const href = link.getAttribute('href');

        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }

    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

        });

    });

    // Image fade-in
    const images = document.querySelectorAll('img');

    images.forEach(img => {

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

    });

});

// Scroll animation function
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

window.addEventListener('load', function() {
    animateOnScroll();
});
