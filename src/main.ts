let puntuacion = 0;
const puntuacionMaxima: number = 7.5;

const muestraPuntuacion = (): void => {
  const divPuntuacion = document.getElementById("puntuacion");
  if (divPuntuacion) {
    divPuntuacion.innerHTML = String(puntuacion);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
});

const cambiosEstadoBotones = (habilitar: boolean): void => {
  const botonPedir = document.getElementById("dame-carta");
  const botonMePlanto = document.getElementById("me-planto");

  if (
    botonPedir instanceof HTMLButtonElement &&
    botonMePlanto instanceof HTMLButtonElement
  ) {
    botonPedir.disabled = !habilitar;
    botonMePlanto.disabled = !habilitar;
  }
};

const mostrarBotonNuevaPartida = (mostrar: boolean): void => {
  const botonNuevaPartida = document.getElementById("nueva-partida");
  if (botonNuevaPartida instanceof HTMLButtonElement) {
    botonNuevaPartida.style.display = mostrar ? "block" : "none";
  }
};

const mostrarMensajeGameOver = (mensaje: string): void => {
  const mensajeGameOver = document.getElementById("game-over");
  if (mensajeGameOver) {
    mensajeGameOver.innerHTML = mensaje;
  }
};

const mostrarMensajePlantarse = (mensaje: string): void => {
  const espacioMensajePlantarse = document.getElementById("mensaje-me-planto");
  if (espacioMensajePlantarse) {
    espacioMensajePlantarse.innerHTML = mensaje;
  }
};

const pintarUrlCarta = (urlImg: string): void => {
  const marcoImagen = document.getElementById("imagenCarta");
  if (marcoImagen instanceof HTMLImageElement) {
    marcoImagen.src = urlImg;
  }
};

const obtenerNombreCarta = (carta: number): string => {
  if (carta === 1) return "as";
  if (carta === 2) return "dos";
  if (carta === 3) return "tres";
  if (carta === 4) return "cuatro";
  if (carta === 5) return "cinco";
  if (carta === 6) return "seis";
  if (carta === 7) return "siete";
  if (carta === 10) return "sota";
  if (carta === 11) return "caballo";
  if (carta === 12) return "rey";
  return "";
};

const obtenerUrlCarta = (carta: number): string => {
  const urlBase =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/";
  const urlImgTrasera =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";

  if (carta >= 1 && carta <= 7) {
    return `${urlBase}${carta}_${obtenerNombreCarta(carta)}-copas.jpg`;
  } else if (carta >= 10 && carta <= 12) {
    return `${urlBase}${carta}_${obtenerNombreCarta(carta)}-copas.jpg`;
  } else {
    return urlImgTrasera;
  }
};

const obtenerValorCarta = (carta: number): number => {
  return carta >= 1 && carta <= 7 ? carta : 0.5;
};

const hasSuperadoPuntuacionMaxima = (): boolean => {
  return puntuacion > puntuacionMaxima;
};

const generarNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

const generarNumeroCarta = (numeroAleatorio: number): number => {
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
};

const sumarCarta = (puntoCarta: number): number => {
  return puntuacion + puntoCarta;
};

const actualizarPuntuacion = (puntosActuales: number): void => {
  puntuacion = puntosActuales;
};

const gestionarPartida = (): void => {
  if (puntuacion === 7.5) {
    console.log("Has ganado la partida");
  } else if (puntuacion > 7.5) {
    console.log("Has perdido la partida");
    gameOver(true);
  }
};

const obtenerMensajePlantarse = (puntuacion: number): string => {
  if (puntuacion < 4) return "Has sido muy conservador 😕";
  if (puntuacion === 5) return "Te ha entrado el canguelo ¿eh? 😉";
  if (puntuacion === 6 || puntuacion === 7) return "Casi casi... 😅";
  if (puntuacion === 7.5) return "¡Lo has clavado! ¡Enhorabuena! 🥳";
  return "👋";
};

const nuevaPartida = (): void => {
  puntuacion = 0;
  mostrarBotonNuevaPartida(true);
};

const gameOver = (situacion: boolean): void => {
  if (situacion) {
    mostrarMensajeGameOver("⚡ GAME OVER 💀 Ya no puedes pedir más cartas.");
    cambiosEstadoBotones(false);
    nuevaPartida();
  }
};

const dameCarta = (): void => {
  const numeroAleatorio = generarNumeroAleatorio();
  const carta = generarNumeroCarta(numeroAleatorio);
  const urlCarta = obtenerUrlCarta(carta);
  pintarUrlCarta(urlCarta);
  const puntosCarta = obtenerValorCarta(carta);
  const puntosSumados = sumarCarta(puntosCarta);
  actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();
  gestionarPartida();
};

const plantarse = (): void => {
  const mensaje = obtenerMensajePlantarse(puntuacion);
  mostrarMensajePlantarse(mensaje);
  cambiosEstadoBotones(false);
  nuevaPartida();
};

const reiniciarPuntuacion = (): void => {
  nuevaPartida();
  muestraPuntuacion();
  mostrarMensajeGameOver("");
  mostrarMensajePlantarse("");
  mostrarBotonNuevaPartida(false);
  pintarUrlCarta(
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg"
  );
  cambiosEstadoBotones(true);
};

const botonPedir = document.getElementById("dame-carta");
if (botonPedir instanceof HTMLButtonElement) {
  botonPedir.addEventListener("click", dameCarta);
}

const botonMePlanto = document.getElementById("me-planto");
if (botonMePlanto instanceof HTMLButtonElement) {
  botonMePlanto.addEventListener("click", plantarse);
}

const botonNuevaPartida = document.getElementById("nueva-partida");
if (botonNuevaPartida instanceof HTMLButtonElement) {
  botonNuevaPartida.addEventListener("click", reiniciarPuntuacion);
}
