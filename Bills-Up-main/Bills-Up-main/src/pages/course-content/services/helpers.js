import { datosCurso } from './datos.js'
import { mostrarContenidoCurso } from './render.js'

export function alternarSeccion(idSeccion) {
  const seccion = datosCurso.sections.find((s) => s.id === idSeccion)
  if (seccion) {
    seccion.expanded = !seccion.expanded
    mostrarContenidoCurso()
  }
}

export function seleccionarLeccion(leccion) {
  datosCurso.sections.forEach((s) => s.lessons.forEach((l) => l.current = false))
  leccion.current = true
  actualizarInfoLeccion(leccion)
  actualizarInterfazContenido(leccion)
  mostrarContenidoCurso()
}

export function encontrarLeccionActual() {
  for (const seccion of datosCurso.sections) {
    const actual = seccion.lessons.find((l) => l.current)
    if (actual) return actual
  }
  return null
}

export function actualizarInfoLeccion(leccion) {
  const e = {
    lessonTitle: document.getElementById("lessonTitle"),
    videoDuration: document.getElementById("videoDuration"),
    lessonDescription: document.getElementById("lessonDescription"),
    durationBadge: document.getElementById("durationBadge"),
    typeBadge: document.getElementById("typeBadge"),
  }

  if (e.lessonTitle) e.lessonTitle.textContent = leccion.title
  if (e.videoDuration) e.videoDuration.textContent = leccion.duration
  if (e.lessonDescription) e.lessonDescription.textContent = leccion.description || "Descripción no disponible"
  if (e.durationBadge) e.durationBadge.textContent = leccion.duration

  if (e.typeBadge) {
    const colores = {
      video: "bg-primary-hover text-primary-white",
      quiz: "bg-orange-500 text-white",
      reading: "bg-purple-500 text-white",
    }
    e.typeBadge.className = `px-3 py-1 rounded-full text-sm font-medium ${colores[leccion.type]}`
    e.typeBadge.textContent = leccion.type[0].toUpperCase() + leccion.type.slice(1)
  }
}

export function actualizarInterfazContenido(leccion) {
  ["videoContainer", "quizContainer", "readingContainer"].forEach(id => {
    const el = document.getElementById(id)
    if (el) el.classList.add("hidden")
  })

  if (leccion.type === "video") mostrarInterfazVideo(leccion)
  if (leccion.type === "quiz") mostrarInterfazQuiz()
  if (leccion.type === "reading") mostrarInterfazLectura()
}

export function mostrarInterfazVideo(leccion) {
  const videoContainer = document.getElementById("videoContainer")
  const youtubePlayer = document.getElementById("youtubePlayer")
  const videoPlaceholder = document.getElementById("videoPlaceholder")

  if (!videoContainer) return
  videoContainer.classList.remove("hidden")

  if (youtubePlayer) {
    youtubePlayer.classList.add("hidden")
    youtubePlayer.src = ""
  }
  if (videoPlaceholder) videoPlaceholder.classList.remove("hidden")
  if (leccion.videoUrl && youtubePlayer) {
    youtubePlayer.src = leccion.videoUrl + "?rel=0"
  }
}

export function mostrarInterfazQuiz() {
  document.getElementById("quizContainer")?.classList.remove("hidden")
}

export function mostrarInterfazLectura() {
  document.getElementById("readingContainer")?.classList.remove("hidden")
}

export function reproducirVideo() {
  const player = document.getElementById("youtubePlayer")
  const placeholder = document.getElementById("videoPlaceholder")
  if (player) player.classList.remove("hidden")
  if (placeholder) placeholder.classList.add("hidden")
}

export function iniciarQuiz() {
  mostrarNotificacion("Quiz iniciado")
}

export function iniciarLectura() {
  mostrarNotificacion("Lectura iniciada")
}

export function regresarAtras() {
  window.dispatchEvent(new CustomEvent("courseNavigation", {
    detail: { action: "back" },
  }))
}

export function mostrarNotificacion(mensaje) {
  const div = document.createElement("div")
  div.className = "fixed top-4 right-4 bg-primary-blue text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300"
  div.textContent = mensaje
  document.body.appendChild(div)

  setTimeout(() => {
    div.classList.add("opacity-0", "translate-x-full")
    setTimeout(() => div.remove(), 300)
  }, 2000)
}

export function obtenerIconoLeccion(leccion) {
  const iconos = {
    video: '<svg class="w-4 h-4 text-primary-hover" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"></path></svg>',
    quiz: '<svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>',
    reading: '<svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"></path></svg>',
  }
  return iconos[leccion.type] || iconos.video
}
