document.addEventListener('DOMContentLoaded', function () {
    initalizeApp();
});

function initalizeApp() {
    createGalery();
    window.onscroll = function () {
        scrollFunction();
    };
}

function createGalery() {
    const galery = document.querySelector('.galery-grid');

    for (let id = 1; id <= 12; id++) {
        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="./build/img/thumb/${id}.avif" type="image/avif">
            <source srcset="./build/img/thumb/${id}.webp" type="image/webp">
            <img loading="lazy" src="./src/img/thumb/${id}.jpg" alt="Galery Image">
        `;
        image.onclick = function () {
            showImage(id);
        };
        galery.appendChild(image);
    }
}

function showImage(id) {
    document.body.classList.add('fixed-body');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const image = document.createElement('picture');
    image.innerHTML = `
            <source srcset="./build/img/grande/${id}.avif" type="image/avif">
            <source srcset="./build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" src="./src/img/grande/${id}.jpg" alt="Galery Image">
        `;

    const closeBtn = document.createElement('p');
    closeBtn.textContent = 'X';
    closeBtn.classList.add('btn-close');
    closeBtn.onclick = function () {
        overlay.remove();
        document.body.classList.remove('fixed-body');
    };

    overlay.appendChild(image);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
}

// Cuando el usuario se desplaza hacia abajo 20px desde la parte superior del documento, muestra el botón
function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        document.getElementById('myBtn').style.display = 'block';
    } else {
        document.getElementById('myBtn').style.display = 'none';
    }
}

// Cuando el usuario hace clic en el botón, se desplaza hacia la parte superior del documento
function topFunction() {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
}
