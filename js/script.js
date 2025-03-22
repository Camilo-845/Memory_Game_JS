var cartas;
var movimientos = 0; // Contador de movimientos
const contenedorCartas = document.getElementById("contenedor-cartas");
const contadorMovimientos = document.getElementById("movimientos");
let primeraCarta, segundaCarta; // Para almacenar las cartas seleccionadas
let bloqueandoClicks = false; // Para evitar múltiples clics
let cartasDescubiertas = 0; // Agregar una variable para contar las cartas descubiertas

// Lista de emojis deportivos
const emojis = ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥇', '🥈', '🥉', '🏋️‍♂️', '🤸‍♀️', '🚴‍♂️', '🏊‍♂️', '🏇', '🏓'];

function generarMatrizPares(n) {
    if (n % 2 !== 0) {
        throw new Error("n debe ser un número par para poder formar pares de números.");
    }

    const totalElementos = n * n;
    let numeros = [];

    // Generar una lista de pares de emojis deportivos aleatorios
    for (let i = 0; i < totalElementos / 2; i++) {
        const emoji = emojis[i % emojis.length]; // Usar emojis de la lista
        numeros.push(emoji, emoji);
    }

    // Mezclar los emojis aleatoriamente
    numeros = numeros.sort(() => Math.random() - 0.5);

    // Crear la matriz n*n con los emojis mezclados
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

// Manejador de clic en carta
function clickEnCarta(event) {
    if (bloqueandoClicks) return; // Evitar clics si ya hay dos cartas abiertas
    const cartaElemento = event.target;

    // Mostrar el número en la carta
    cartaElemento.textContent = cartaElemento.dataset.valor;
    cartaElemento.classList.add("abierta"); // Agregar clase de animación al abrir

    if (!primeraCarta) {
        primeraCarta = cartaElemento;
    } else {
        segundaCarta = cartaElemento;
        bloqueandoClicks = true; // Bloquear clics

        // Incrementar el contador de movimientos
        movimientos++;
        contadorMovimientos.textContent = `Movimientos: ${movimientos}`;

        // Comprobar si las cartas son iguales
        if (primeraCarta.dataset.valor === segundaCarta.dataset.valor) {
            // Mantener las cartas abiertas
            primeraCarta.removeEventListener("click", clickEnCarta);
            segundaCarta.removeEventListener("click", clickEnCarta);
            
            // Incrementar el contador de cartas descubiertas
            cartasDescubiertas += 2; // Dos cartas descubiertas
            verificarVictoria(); // Verificar si se ha ganado
            reiniciarSeleccion();
        } else {
            // Agregar clase incorrecta para animación
            primeraCarta.classList.add("incorrecta");
            segundaCarta.classList.add("incorrecta");

            // Volver a ocultar las cartas después de un retraso
            setTimeout(() => {
                // Reiniciar la animación
                primeraCarta.classList.remove("incorrecta");
                segundaCarta.classList.remove("incorrecta");

                // Forzar la reflujo para reiniciar la animación
                void primeraCarta.offsetWidth; // Trigger reflow
                void segundaCarta.offsetWidth; // Trigger reflow

                primeraCarta.textContent = "";
                segundaCarta.textContent = "";
                reiniciarSeleccion();
            }, 1000);
        }
    }
}

// Nueva función para reiniciar el juego
function reiniciarJuego() {
    iniciarJuego(); // Llamar a la función para iniciar el juego
}

// Nueva función para verificar si el jugador ha ganado
function verificarVictoria() {
    const totalCartas = cartas.length * cartas.length; // Total de cartas en el juego
    if (cartasDescubiertas === totalCartas) {
        // Mostrar confeti en lugar de una alerta
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        document.getElementById("reiniciar").style.display = "block"; // Mostrar el botón de reinicio
    }
}

// Reiniciar selección de cartas
function reiniciarSeleccion() {
    primeraCarta = null;
    segundaCarta = null;
    bloqueandoClicks = false;
}

// Insertar cartas al tablero
function insertarCartas() {
    // Limpiar el contenedor antes de insertar nuevas cartas
    contenedorCartas.innerHTML = '';

    // Establecer el número de columnas en el contenedor
    contenedorCartas.style.setProperty('--num-columns', cartas.length); // Establecer la variable CSS

    // Recorrer la matriz de cartas y crear elementos
    cartas.forEach(fila => {
        fila.forEach(carta => {
            const cartaElemento = document.createElement('div');
            cartaElemento.classList.add('carta');
            cartaElemento.dataset.valor = carta; // Asignar el número a la carta
            cartaElemento.addEventListener("click", clickEnCarta);
            contenedorCartas.appendChild(cartaElemento); // Insertar la carta en el contenedor
        });
    });
}

// Iniciar Juego
function iniciarJuego() {
    cartas = generarMatrizPares(4); // Cambiar a 4 para un tablero 4x4
    insertarCartas(); // Llamar a la función para insertar las cartas
    movimientos = 0; // Reiniciar el contador de movimientos
    cartasDescubiertas = 0; // Reiniciar el contador de cartas descubiertas
    contadorMovimientos.textContent = `Movimientos: ${movimientos}`; // Actualizar el contador en la interfaz
    document.getElementById("reiniciar").style.display = "none"; // Ocultar el botón de reinicio
}

// Agregar evento al botón de reinicio
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);

// Iniciar el juego una vez que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    iniciarJuego();
});