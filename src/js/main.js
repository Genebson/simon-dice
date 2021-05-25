const $form = document.querySelector('#form');

let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;
const startSound = document.querySelector('#simon-start');
const redSound = document.querySelector('#simon-red');
const blueSound = document.querySelector('#simon-blue');
const yellowSound = document.querySelector('#simon-yellow');
const greenSound = document.querySelector('#simon-green');
const wrongSound = document.querySelector('#simon-wrong');
const correctSound = document.querySelector('#simon-correct');
const scoreSound = document.querySelector('#simon-score');
const topScoreSound = document.querySelector('#simon-top-score');

$form.start.onclick = function () {
  startSound.play()
  iniciarJuego()
  mensajeAutomatico('¡Comencemos! 🔮')
  ronda = 0
  actualizarPuntaje(ronda)
  bloquearInputUsuario
}

function iniciarJuego() {
  reiniciarJuego()
  manejarRonda()
  ocultarBotonStart()
}

function manejarRonda() {
  bloquearInputUsuario()

  const $nuevoPad = padRandom()
  secuenciaMaquina.push($nuevoPad)

  const delayUsuario = (secuenciaMaquina.length + 1) * 1000

  secuenciaMaquina.forEach(function ($cuadro, i) {
    const delayMaquina = (i + 1) * 1000
    setTimeout(function () {
      mensajeAutomatico('Turno de la máquina 🤖')
      resaltar($cuadro)
    }, delayMaquina)
  })

  setTimeout(function () {
    mensajeAutomatico('Tu turno 👆🏻')
    desbloquearInputUsuario()
  }, delayUsuario)

  secuenciaUsuario = []
  actualizarPuntaje(ronda)
}

function actualizarPuntaje(ronda) {
  $form.puntaje.value = ronda
}

function puntajeMaximo() {
  const puntajeMaximo = $form['puntaje-maximo'].value
  const puntaje = $form.puntaje.value

  if (puntaje > puntajeMaximo) {
    $form['puntaje-maximo'].value = puntaje
    setTimeout(function () {
      topScoreSound.play()
    }, 200)
  }
}

function mensajeAutomatico(mensaje) {
  $form.mensaje.value = mensaje
}

function padRandom() {
  const $cuadros = document.querySelectorAll('.cuadro')
  const indice = Math.floor(Math.random() * $cuadros.length)
  return $cuadros[indice]
}

function manejarInputUsuario(e) {
  const $cuadro = e.target
  resaltar($cuadro)
  secuenciaUsuario.push($cuadro)

  const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]

  if ($cuadro.id !== $cuadroMaquina.id) {
    wrongSound.play()
    perder()
    puntajeMaximo()
    return;
  }

  if (secuenciaUsuario.length === secuenciaMaquina.length) {
    ronda++
    correctSound.play()
    bloquearInputUsuario()
    mensajeAutomatico(textoGanador())
    setTimeout(manejarRonda, 1000)
  }
}

function bloquearInputUsuario() {
  const $cuadros = document.querySelectorAll('.cuadro')

  $cuadros.forEach(function ($cuadro) {
    $cuadro.onclick = function () {
    }
  })
}

function desbloquearInputUsuario() {
  const $cuadros = document.querySelectorAll('.cuadro')
  $cuadros.forEach(function ($cuadro) {
    $cuadro.onclick = manejarInputUsuario
  })
}

function perder() {
  bloquearInputUsuario()
  mensajeAutomatico(textoPerdedor())
  reiniciarJuego()
  mostrarBotonStart()
}

function resaltar($cuadro) {
  $cuadro.style.opacity = 1;

  setTimeout(function () {
    $cuadro.style.opacity = 0.7;
  }, 500)
}

function textoPerdedor() {
  const frases = [
    'Uf, estuviste cerca 😬',
    'Perdiste? Sí. Vas a jugar otra vez? Obvio 💪🏻',
    'Jugate otra, ésta es la buena 🎰',
    'Noooooooo 😭',
    'Tranqui fiera, tomate un descanso 🛀🏻',
    'Qué pasó pipi? Ese no era el color correcto 🤦🏻‍♂️',
    'Tip: prestá atención a los sonidos 😉',
    'Escuchame, tomate una birrita y volvé más fresco 🍺'
  ]

  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria];
}

function textoGanador() {
  const frases = [
    'Hermoso! 😎',
    'Seguí así 😲',
    'El rey de la timba 🎲',
    'Siiiiiiiiiii 🤪',
    'Ojalá yo tuviera esa memoria 🧠',
    'Excelente movimiento 🤺',
    'Dibuje Román ⚽',
    'Cómo te acordaste el patrón? 😳'
  ]

  const fraseAleatoria = Math.floor(Math.random() * (frases.length - 1))
  return frases[fraseAleatoria];
}

function reiniciarJuego() {
  secuenciaMaquina = []
  secuenciaUsuario = []
  ronda = 0
}

function ocultarBotonStart() {
  start.className = 'd-none'
}

function mostrarBotonStart() {
  start.className = 'btn-start'
  start.value = 'reiniciar'
}