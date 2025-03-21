var cartas;
const cardContainer = document.getElementById("card-container")


function generarMatrizPares(n) {
    if (n % 2 !== 0) {
        throw new Error("n debe ser un número par para poder formar pares de números.");
    }

    const totalElementos = n * n;
    let numeros = [];

    // Generar una lista de pares de números aleatorios
    for (let i = 1; i <= totalElementos / 2; i++) {
        numeros.push(i, i);
    }

    // Mezclar los números aleatoriamente
    numeros = numeros.sort(() => Math.random() - 0.5);

    // Crear la matriz n*n con los números mezclados
    const matriz = [];
    for (let i = 0; i < n; i++) {
        const fila = [];
        for (let j = 0; j < n; j++) {
            fila.push(numeros.pop());
        }
        matriz.push(fila);
    }

    return matriz;
}

// Manejador de click en targeta
function clickEnTargeta(event){
    console.log(event)
    event.target.textContent = "click"
}

// Insertar cartas al tablero
function insertarCartas() {
    // Limpiar el contenedor antes de insertar nuevas cartas
    cardContainer.innerHTML = '';

    // Establecer el número de columnas en el contenedor
    cardContainer.style.setProperty('--num-columns', cartas.length); // Establecer la variable CSS
    console.log( cartas.length)

    // Recorrer la matriz de cartas y crear elementos
    cartas.forEach(fila => {
        fila.forEach(carta => {
            const cartaElemento = document.createElement('div');
            cartaElemento.classList.add('card');
            cartaElemento.textContent = carta; // Asignar el número a la carta
            cardContainer.appendChild(cartaElemento); // Insertar la carta en el contenedor
            cartaElemento.addEventListener("click", clickEnTargeta)
        });
    });
}

// Iniciar Juego
function IniciarJugeo() {
    cartas = generarMatrizPares(2);
    console.log(cartas); // Verificar la matriz generada
    insertarCartas(); // Llamar a la función para insertar las cartas
}

// Iniciar el juego una vez que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    IniciarJugeo();
});