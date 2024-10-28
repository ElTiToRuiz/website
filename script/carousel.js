const carousel = document.querySelector('.carousel-wrapper');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const totalItems = items.length;
let currentIndex = 0;

// Función para organizar los elementos del carrusel
function arrangeCarousel() {
    items.forEach((item, index) => {
        // Remover todas las clases previas
        item.classList.remove('active', 'left', 'right', 'far-left', 'far-right', 'fade-out-right', 'fade-in-left');
        item.style.transform = ''; // Limpiar cualquier transform anterior
        item.style.opacity = ''; // Limpiar cualquier opacidad anterior

        const diff = (index - currentIndex + totalItems) % totalItems;

        if (diff === 0) {
            // El ítem en el centro
            item.classList.add('active');
            item.style.transform = 'translateX(0) scale(1.2)';
            item.style.opacity = '1';
            item.style.zIndex = '3';
        } else if (diff === 1) {
            // El ítem a la derecha (se mueve hacia fuera a la derecha)
            item.classList.add('right');
            item.style.transform = 'translateX(120%) scale(0.9)';
            item.style.opacity = '0.8';
            item.style.zIndex = '2';
        } else if (diff === totalItems - 1) {
            // El ítem a la izquierda (se mueve desde fuera a la izquierda)
            item.classList.add('left');
            item.style.transform = 'translateX(-120%) scale(0.9)';
            item.style.opacity = '0.8';
            item.style.zIndex = '2';
        } else {
            // Elementos más alejados o fuera de vista
            item.style.transform = 'translateX(200%)'; // Los alejamos completamente
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });
}

// Rotar el carrusel a la izquierda (el siguiente elemento viene de la izquierda)
function rotateLeft() {
    // Animación para el ítem que sale por la derecha
    const rightItem = items[(currentIndex + 1) % totalItems];
    rightItem.classList.add('fade-out-right');
    
    // Actualizar el índice y reorganizar los elementos
    currentIndex = (currentIndex + 1) % totalItems;
    
    // Reorganizamos el carrusel después de un pequeño retraso para permitir la animación de salida
    setTimeout(() => {
        arrangeCarousel();

        // Animación para el ítem que entra por la izquierda
        const leftItem = items[(currentIndex - 1 + totalItems) % totalItems];
        leftItem.classList.add('fade-in-left');
    }, 300); // Tiempo de la animación de salida
}

// Rotar el carrusel a la derecha (el siguiente elemento viene de la derecha)
function rotateRight() {
    // Animación para el ítem que sale por la izquierda
    const leftItem = items[(currentIndex - 1 + totalItems) % totalItems];
    leftItem.classList.add('fade-out-left');

    // Actualizar el índice y reorganizar los elementos
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    
    // Reorganizamos el carrusel después de un pequeño retraso para permitir la animación de salida
    setTimeout(() => {
        arrangeCarousel();

        // Animación para el ítem que entra por la derecha
        const rightItem = items[(currentIndex + 1) % totalItems];
        rightItem.classList.add('fade-in-right');
    }, 300); // Tiempo de la animación de salida
}

// Auto rotate every 5 seconds
let autoRotate = setInterval(rotateLeft, 5000);

// Manual control buttons
document.querySelector('.carousel-next').addEventListener('click', () => {
    document.querySelector('.carousel-next').disabled = true;
    clearInterval(autoRotate);
    rotateLeft();
    autoRotate = setInterval(rotateLeft, 5000);
    setTimeout(() => { document.querySelector('.carousel-next').disabled = false; }, 500);
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    document.querySelector('.carousel-prev').disabled = true;
    clearInterval(autoRotate);
    rotateRight();
    autoRotate = setInterval(rotateLeft, 5000);
    setTimeout(() => { document.querySelector('.carousel-prev').disabled = false; }, 500);
});

// Initial setup
arrangeCarousel();
