import { reproducirVideo, iniciarQuiz, iniciarLectura, regresarAtras } from './helpers.js'

export function configurarEventos() {
  document.getElementById("playBtn")?.addEventListener("click", reproducirVideo)
  document.getElementById("startQuizBtn")?.addEventListener("click", iniciarQuiz)
  document.getElementById("startReadingBtn")?.addEventListener("click", iniciarLectura)
  document.getElementById("backBtn")?.addEventListener("click", regresarAtras)
}
