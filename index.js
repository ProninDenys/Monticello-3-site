document.addEventListener('DOMContentLoaded', function () {
    // Переключение активного состояния для меню (menu-ellipse)
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

    // Переключение активного состояния для Dots в хедере
    const headerDots = document.querySelectorAll('.dots-container .ellipse');
    if (headerDots.length > 0) {
        headerDots.forEach((dot) => {
            dot.addEventListener('click', () => {
                headerDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
    }

    // Переключение активного состояния для Dots в слайдере новостей
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

    // Инициализация карты
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Добавление слоя карты OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Создание формы и добавление её в документ
        const contactForm = document.querySelector('.contact-form-container');
        if (contactForm) {
            contactForm.style.display = 'none';

            let currentMarker = null;

            // Функция для добавления маркера и отображения формы
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

            // Функции для показа и скрытия формы
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

            // Обработчик клика по карте для добавления маркера и отображения формы
            map.on('click', function (e) {
                const latlng = e.latlng;
                addMarker(latlng);
            });

            // Скрытие формы и маркера при клике на карте, если клик не по маркеру
            map.on('click', function (e) {
                if (currentMarker && !currentMarker.getLatLng().equals(e.latlng)) {
                    map.removeLayer(currentMarker); // Удаляем маркер
                    currentMarker = null;
                    hideForm();
                }
            });
        }
    }

    // элемент стрелки
    const arrow = document.querySelector('.arrow-container');
    if (arrow) {
        arrow.addEventListener('click', function () {
            // Projects и выполняем плавный скролл
            const projectsSection = document.getElementById('projects');
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Слайдер HEADER
    let headerSlides = document.querySelectorAll('.header-slide');
    let currentHeaderSlide = 0;

    if (headerSlides.length > 0) {
        setInterval(() => {
            headerSlides[currentHeaderSlide].classList.remove('active');
            currentHeaderSlide = (currentHeaderSlide + 1) % headerSlides.length;
            headerSlides[currentHeaderSlide].classList.add('active');
        }, 4000);
    }

    // Слайдер NEWS
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

    // Управление стрелками
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function() {
            currentNewsSlide = (currentNewsSlide - 1 + newsSlides.length) % newsSlides.length;
            updateNewsSlider();
        });

        rightArrow.addEventListener('click', function() {
            currentNewsSlide = (currentNewsSlide + 1) % newsSlides.length;
            updateNewsSlider();
        });
    }

    // Скролл к секции с картой при клике на "CONTACT" в меню
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', function (e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Инициализация начального состояния слайдера новостей
    if (newsSlides.length > 0) {
        updateNewsSlider();
    }
});


