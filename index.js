document.addEventListener('DOMContentLoaded', function() {
    // Переключение активного состояния для меню (menu-ellipse)
    document.querySelectorAll('.menu-ellipse').forEach(function(ellipse) {
        ellipse.addEventListener('click', function() {
            document.querySelectorAll('.menu-ellipse').forEach(function(e) {
                e.classList.remove('active'); // Убираем активное состояние у всех эллипсов
            });
            ellipse.classList.add('active'); // Добавляем активное состояние к нажатому эллипсу
        });
    });

    // Переключение активного состояния для Dots в хедере
    const headerDots = document.querySelectorAll('.dots-container .ellipse');
    headerDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            headerDots.forEach(d => d.classList.remove('active')); // Убираем активный класс со всех точек
            dot.classList.add('active'); // Добавляем активный класс к нажатой точке
        });
    });

    // Переключение активного состояния для Dots в слайдере новостей
    const newsDots = document.querySelectorAll('.slider-dots .dot');
    newsDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            newsDots.forEach(d => d.classList.remove('active')); // Убираем активный класс со всех точек
            dot.classList.add('active'); // Добавляем активный класс к нажатой точке
        });
    });
});
