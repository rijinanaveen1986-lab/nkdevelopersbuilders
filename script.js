// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Smooth scrolling
    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(link => {
        link.addEventListener('click', function (e) {

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

        contactForm.addEventListener('submit', function (e) {

            e.preventDefault();

            const formData = new FormData(this);

            const data = {
                name: formData.get("name"),
                phone: formData.get("phone"),
                email: formData.get("email"),
                business: formData.get("business"),
                websitetype: formData.get("websitetype"),
                budget: formData.get("budget"),
                example: formData.get("example"),
                message: formData.get("message")
            };

            fetch("https://script.google.com/macros/s/AKfycbzgc5HFCxsvS2C11OJiOc4OGtW5LwP-_mN8P-FthZ71TSZ-yEyDiZJuCVGkYNEaxGb_/exec", {
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(response => response.text())
                .then(data => {

                    alert("Project request submitted successfully!");

                    contactForm.reset();

                })
                .catch(error => {

                    alert("Something went wrong. Please try again.");

                    console.error(error);

                });

        });

    }

});
