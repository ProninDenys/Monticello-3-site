document.addEventListener('DOMContentLoaded', function () {
    // Toggle active state for menu ellipses
    const menuEllipses = document.querySelectorAll('.menu-ellipse');
    if (menuEllipses.length > 0) {
        menuEllipses.forEach(function (ellipse) {
            ellipse.addEventListener('click', function () {
                menuEllipses.forEach(function (e) {
                    e.classList.remove('active');
                });
                ellipse.classList.add('active');
            });
        });
    }

    // HEADER slider with dots
    let headerSlides = document.querySelectorAll('.header-slide');
    let headerDots = document.querySelectorAll('.dots-container .dot');
    let currentHeaderSlide = 0;
    const headerSlideInterval = 4000; // Slide change interval time

    // Add text to all slides
    headerSlides.forEach(slide => {
        let headingText = document.createElement('h1');
        headingText.classList.add('heading-text');
        headingText.innerText = 'SIMPLE & MODERN';

        let subheadingText = document.createElement('p');
        subheadingText.classList.add('subheading-text');
        subheadingText.innerText = 'WE MAKE THE WORLD BEAUTIFUL EVERYDAY';

        slide.appendChild(headingText);
        slide.appendChild(subheadingText);
    });

    function changeHeaderSlide(index) {
        // Remove 'active' class from the current slide and dot
        headerSlides[currentHeaderSlide].classList.remove('active');
        headerDots[currentHeaderSlide].classList.remove('active');

        // Set a new slide index
        currentHeaderSlide = (typeof index === 'number') ? index : (currentHeaderSlide + 1) % headerSlides.length;

        // Add 'active' class to the new slide and dot
        headerSlides[currentHeaderSlide].classList.add('active');
        headerDots[currentHeaderSlide].classList.add('active');
    }

    if (headerSlides.length > 0 && headerDots.length > 0) {
        setInterval(changeHeaderSlide, headerSlideInterval);

        // Handle click on dots for manual slide change
        headerDots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                changeHeaderSlide(index);
            });
        });
    }

    // Toggle active state for Dots in the news slider
    const newsDots = document.querySelectorAll('.slider-dots .dot');
    let currentNewsSlide = 0;

    if (newsDots.length > 0) {
        newsDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentNewsSlide = index;
                updateNewsSlider();
            });
        });
    }

    // Map initialization
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Add OpenStreetMap layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Create form and add it to the document
        const contactForm = document.querySelector('.contact-form-container');
        if (contactForm) {
            contactForm.style.display = 'none';

            let currentMarker = null;

            // Function to add marker and show form
            function addMarker(latlng) {
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                    hideForm();
                    currentMarker = null;
                } else {
                    currentMarker = L.marker(latlng).addTo(map);

                    currentMarker.on('click', function () {
                        if (contactForm.style.display === 'none' || contactForm.style.opacity === '0') {
                            showForm();
                        } else {
                            hideForm();
                            map.removeLayer(currentMarker);
                            currentMarker = null;
                        }
                    });

                    showForm();
                }
            }

            // Functions to show and hide form
            function showForm() {
                contactForm.style.display = 'block';
                contactForm.style.opacity = '1';
                contactForm.style.visibility = 'visible';
            }

            function hideForm() {
                contactForm.style.opacity = '0';
                contactForm.style.visibility = 'hidden';
                setTimeout(function () {
                    contactForm.style.display = 'none';
                }, 500);
            }

            // Map click handler for adding marker and showing the form
            map.on('click', function (e) {
                const latlng = e.latlng;
                addMarker(latlng);
            });

            // Hide form and marker when clicking on the map outside the marker
            map.on('click', function (e) {
                if (currentMarker && !currentMarker.getLatLng().equals(e.latlng)) {
                    map.removeLayer(currentMarker); // Remove marker
                    currentMarker = null;
                    hideForm();
                }
            });
        }
    }

    // Arrow element
    const arrow = document.querySelector('.arrow-container');
    if (arrow) {
        arrow.addEventListener('click', function () {
            // Scroll smoothly to Projects section
            const projectsSection = document.getElementById('projects');
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // NEWS slider
    let newsSlides = document.querySelectorAll('.news-slide');
    currentNewsSlide = 0;

    function updateNewsSlider() {
        newsSlides.forEach((slide, index) => {
            if (index === currentNewsSlide) {
                slide.style.opacity = '1';
                slide.style.zIndex = '2';
            } else {
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });
    }

    if (newsSlides.length > 0) {
        setInterval(() => {
            currentNewsSlide = (currentNewsSlide + 1) % newsSlides.length;
            updateNewsSlider();
        }, 4000);
    }

    // Arrow control for the news slider
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function () {
            currentNewsSlide = (currentNewsSlide - 1 + newsSlides.length) % newsSlides.length;
            updateNewsSlider();
        });

        rightArrow.addEventListener('click', function () {
            currentNewsSlide = (currentNewsSlide + 1) % newsSlides.length;
            updateNewsSlider();
        });
    }

    // Scroll to map section when clicking "CONTACT" in the menu
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', function (e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initialize the news slider
    if (newsSlides.length > 0) {
        updateNewsSlider();
    }
});
