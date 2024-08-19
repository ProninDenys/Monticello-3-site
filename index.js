document.querySelectorAll('.menu-ellipse').forEach(function(ellipse) {
    ellipse.addEventListener('click', function() {
        document.querySelectorAll('.menu-ellipse').forEach(function(e) {
            e.classList.remove('active'); // Убираем активное состояние у всех эллипсов
        });
        ellipse.classList.add('active'); // Добавляем активное состояние к нажатому эллипсу
    });
});

document.querySelectorAll('.ellipse').forEach(function(ellipse, index) {
    ellipse.addEventListener('click', function() {
        document.querySelectorAll('.ellipse').forEach(function(e) {
            e.classList.remove('active');
        });
        ellipse.classList.add('active');
        
        // Здесь можно добавить логику для переключения слайдов:
        // changeSlide(index);
    });
});
