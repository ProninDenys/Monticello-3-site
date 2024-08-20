document.addEventListener('DOMContentLoaded', function() {
    // Переключение активного состояния для меню (menu-ellipse)
    document.querySelectorAll('.menu-ellipse').forEach(function(ellipse) {
        ellipse.addEventListener('click', function() {
            document.querySelectorAll('.menu-ellipse').forEach(function(e) {
                e.classList.remove('active');
            });
            ellipse.classList.add('active');
        });
    });

    // Переключение активного состояния для Dots в хедере
    const headerDots = document.querySelectorAll('.dots-container .ellipse');
    headerDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            headerDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // Переключение активного состояния для Dots в слайдере новостей
    const newsDots = document.querySelectorAll('.slider-dots .dot');
    newsDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            newsDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // Инициализация карты
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Добавление слоя карты OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Создание формы и добавление её в документ
    var contactForm = document.querySelector('.contact-form-container');
    
    // Изначально скрываем форму
    contactForm.style.display = 'none';

    var currentMarker = null;

    // Функция для добавления маркера и отображения формы
    function addMarker(latlng) {
        if (currentMarker) {
            // Удаляем текущий маркер, если он есть
            map.removeLayer(currentMarker); 
            contactForm.style.opacity = '0';
            contactForm.style.visibility = 'hidden';
            setTimeout(function() {
                contactForm.style.display = 'none';
            }, 500); // Плавное исчезновение формы
            currentMarker = null;
        } else {
            // Добавляем новый маркер
            currentMarker = L.marker(latlng).addTo(map);

            currentMarker.on('click', function() {
                if (contactForm.style.display === 'none' || contactForm.style.opacity === '0') {
                    contactForm.style.display = 'block';
                    contactForm.style.opacity = '1';
                    contactForm.style.visibility = 'visible';
                } else {
                    contactForm.style.opacity = '0';
                    contactForm.style.visibility = 'hidden';
                    setTimeout(function() {
                        contactForm.style.display = 'none';
                    }, 500); // Плавное исчезновение формы
                    map.removeLayer(currentMarker);
                    currentMarker = null;
                }
            });

            contactForm.style.display = 'block';
            contactForm.style.opacity = '1';
            contactForm.style.visibility = 'visible';
        }
    }

    // Обработчик клика по карте для добавления маркера и отображения формы
    map.on('click', function(e) {
        var latlng = e.latlng;
        addMarker(latlng);
    });

    // Скрытие формы и маркера при клике на карте, если клик не по маркеру
    map.on('click', function(e) {
        if (currentMarker && !currentMarker.getLatLng().equals(e.latlng)) {
            map.removeLayer(currentMarker); // Удаляем маркер
            currentMarker = null;
            contactForm.style.opacity = '0';
            contactForm.style.visibility = 'hidden';
            setTimeout(function() {
                contactForm.style.display = 'none';
            }, 500); // Плавное исчезновение формы
        }
    });
});
