import "./style.css";

let puntuacion: number = 0;
const puntuacionMaxima: number = 7.5;
// let partidaTerminada : boolean = false;

const muestraPuntuacion = (): void => {
  const divPuntuacion = document.getElementById("puntuacion");
  if (divPuntuacion) {
    divPuntuacion.innerHTML = String(puntuacion);
  }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

const cambiosEstadoBotones = (habilitar: boolean): void => {
  const botonPedir = document.getElementById("dame-carta") as HTMLButtonElement;
  const botonMePlanto = document.getElementById("me-planto") as HTMLButtonElement;

  if (botonPedir && botonMePlanto) {
    botonPedir.disabled = !habilitar;
    botonMePlanto.disabled = !habilitar;
  }
};


const nuevaPartida = (): void => {
  puntuacion = 0;
  //console.log("El botón se ha pinchado");
  //console.log(`La puntuación es ${puntuacion}`);
  const botonNuevaPartida = document.getElementById("nueva-partida");
  if (botonNuevaPartida && botonNuevaPartida instanceof HTMLButtonElement) {
    botonNuevaPartida.style.display = "block";
  }
};

const hasSuperadoPuntuacionMaxima = (): boolean => {
  return puntuacion > puntuacionMaxima;
};

const gameOver = (situacion: boolean) => {
  if (situacion === true) {
   //const botonPedir = document.getElementById("dame-carta");
    //const botonMePlanto = document.getElementById("me-planto");

    const mensajeGameOver = document.getElementById("game-over");
    if(mensajeGameOver){
      mensajeGameOver.innerHTML = `⚡ GAME OVER 💀 Ya no puedes pedir más cartas.`;
    }
    cambiosEstadoBotones(false);
    nuevaPartida();
  }
};

const muestraCarta = (carta: number): void => {
  let urlImg = "";
  switch (carta) {
    case 1:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      urlImg =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      break;
  }
  let marcoImagen = document.getElementById("imagenCarta") as HTMLImageElement;
  marcoImagen.src = urlImg;
  // console.log(`La url desde muestra carta: ${urlImg}`);
};


const obtenerValorCarta = (carta: number): number => {
  if (carta >= 1 && carta <= 7) {
    return carta; 
  } else {
    return 0.5; 
  }
};

const dameCarta = (): number => {
  let numeroAleatorio = Math.floor(Math.random() * 10) + 1;

  if (numeroAleatorio > 7) {
    numeroAleatorio += 2;
  }
  // console.log(numeroAleatorio);
  muestraCarta(numeroAleatorio);
  const valorCarta = obtenerValorCarta(numeroAleatorio);
  puntuacion += valorCarta;
  muestraPuntuacion();
  gameOver(hasSuperadoPuntuacionMaxima());
  return numeroAleatorio;
};

const boton = document.getElementById("dame-carta");
boton?.addEventListener("click", dameCarta);

const plantarse = () => {
  let recuentoPuntuacion = puntuacion;
  let mensajePlantarse = "";
  const espacioMensajePlantarse = document.getElementById("mensaje-me-planto");
  
  switch (true) {
    case recuentoPuntuacion < 4:
      mensajePlantarse = `Has sido muy conservador 😕`;
      break;
    case recuentoPuntuacion === 5:
      mensajePlantarse = `Te ha entrado el canguelo ¿eh? 😉`;
      break;
    case recuentoPuntuacion === 6 || recuentoPuntuacion === 7:
      mensajePlantarse = `Casi casi... 😅`;
      break;
    case recuentoPuntuacion === 7.5:
      mensajePlantarse = `¡Lo has clavado! ¡Enhorabuena! 🥳`;
      break;
    default:
      mensajePlantarse = `👋`;
      break;
  }

  if (espacioMensajePlantarse) {
    espacioMensajePlantarse.innerHTML = mensajePlantarse;
  }

  cambiosEstadoBotones(false);

};

const botonMePlanto = document.getElementById("me-planto");
botonMePlanto?.addEventListener("click", plantarse);
botonMePlanto?.addEventListener("click", () => nuevaPartida());

const reiniciarPuntuacion = () : void => {
  nuevaPartida();
  const divPuntuacion = document.getElementById("puntuacion");
  const divGameOver = document.getElementById("game-over");
  const botonNuevaPartida = document.getElementById("nueva-partida");
  const espacioMensajePlantarse = document.getElementById("mensaje-me-planto");


  const urlImagenCartaReiniciar = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  let marcoImagen = document.getElementById("imagenCarta") as HTMLImageElement;
  
  if (divPuntuacion) { 
    divPuntuacion.innerHTML = String(puntuacion);
  }
  if(divGameOver){
    divGameOver.innerHTML = "";
  }
  if(espacioMensajePlantarse){
    espacioMensajePlantarse.innerHTML = "";
  }
  if (botonNuevaPartida && botonNuevaPartida instanceof HTMLButtonElement) {
    botonNuevaPartida.style.display = "none";
  }
  if (marcoImagen) {
    marcoImagen.src = urlImagenCartaReiniciar;
  }

  cambiosEstadoBotones(true);
};

const botonNuevaPartida = document.getElementById("nueva-partida");
botonNuevaPartida?.addEventListener("click", reiniciarPuntuacion);

