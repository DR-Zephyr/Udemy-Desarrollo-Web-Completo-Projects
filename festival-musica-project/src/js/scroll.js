
// Cuando el usuario se desplaza hacia abajo 20px desde la parte superior del documento, muestra el botón
    export function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        document.getElementById('myBtn').style.display = 'block';
    } else {
        document.getElementById('myBtn').style.display = 'none';
    }
}