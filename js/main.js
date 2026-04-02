document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    function updateGreeting() {
        const greetingEl = document.querySelector('.greeting');
        const hour = new Date().getHours();

        let greeting;
        if (hour >= 5 && hour < 11) {
            greeting = '☀️ Guten Morgen';
        } else if (hour >= 11 && hour < 17) {
            greeting = '🌤️ Guten Tag';
        } else if (hour >= 17 && hour < 22) {
            greeting = '🌙 Guten Abend';
        } else {
            greeting = '🌙 Gute Nacht';
        }

        greetingEl.textContent = greeting;
    }

    updateGreeting();

    // Toggle logic for Services
    const priceToggles = document.querySelectorAll('input[name="price-toggle"]');
    const categories = document.querySelectorAll('.price-category');

    if (priceToggles.length > 0 && categories.length > 0) {
        // Automatically categorize based on title
        categories.forEach(category => {
            const title = category.querySelector('h3').textContent;
            if (title.includes('Coiffeur')) {
                category.classList.add('category-coiffeur');
            } else {
                category.classList.add('category-kosmetik');
            }
        });

        const categoriesCoiffeur = document.querySelectorAll('.category-coiffeur');
        const categoriesKosmetik = document.querySelectorAll('.category-kosmetik');

        function updateLists(selected) {
            if (selected === 'coiffeur') {
                categoriesKosmetik.forEach(el => { el.style.display = 'none'; el.classList.remove('fade-in'); });
                categoriesCoiffeur.forEach(el => {
                    el.style.display = 'block';
                    // Force reflow for animation to restart
                    void el.offsetWidth;
                    el.classList.add('fade-in');
                });
            } else {
                categoriesCoiffeur.forEach(el => { el.style.display = 'none'; el.classList.remove('fade-in'); });
                categoriesKosmetik.forEach(el => {
                    el.style.display = 'block';
                    // Force reflow for animation to restart
                    void el.offsetWidth;
                    el.classList.add('fade-in');
                });
            }
        }

        priceToggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                updateLists(e.target.value);
            });
        });

        // Initialize state
        updateLists('coiffeur');
    }
});