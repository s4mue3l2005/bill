// ============================================
// DATOS ESTÁTICOS DEL CURSO
// ============================================

const datosCurso = {
  title: "Desarrollo Web Completo",
  totalLessons: 9,
  sections: [
    {
      id: 1,
      title: "Introducción al Desarrollo Web",
      expanded: true,
      lessons: [
        {
          id: 1,
          title: "¿Qué es el desarrollo web?",
          type: "video",
          duration: "8:30",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Introducción completa al mundo del desarrollo web moderno.",
        },
        {
          id: 2,
          title: "Configuración del entorno",
          type: "video",
          duration: "12:45",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Aprende a configurar tu entorno de desarrollo profesional.",
        },
        {
          id: 3,
          title: "HTML básico",
          type: "video",
          duration: "15:20",
          current: true,
          videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
          description: "Fundamentos de HTML y estructura de documentos web.",
        },
        {
          id: 4,
          title: "Quiz: Conceptos básicos",
          type: "quiz",
          duration: "5:00",
          description: "Evalúa tus conocimientos sobre los conceptos básicos.",
        },
      ],
    },
    {
      id: 2,
      title: "Fundamentos de React",
      expanded: false,
      lessons: [
        {
          id: 5,
          title: "¿Qué es React?",
          type: "video",
          duration: "10:15",
          videoUrl: "https://www.youtube.com/embed/Tn6-PIqc4UM",
          description: "Introducción a React y sus conceptos fundamentales.",
        },
        {
          id: 6,
          title: "Componentes y JSX",
          type: "video",
          duration: "18:30",
          videoUrl: "https://www.youtube.com/embed/DLX62G4lc44",
          description: "Aprende a crear componentes y usar JSX efectivamente.",
        },
        {
          id: 7,
          title: "Props y State",
          type: "video",
          duration: "22:10",
          videoUrl: "https://www.youtube.com/embed/hQAHSlTtcmY",
          description: "Manejo de datos en React con props y state.",
        },
        {
          id: 8,
          title: "Ejercicio práctico",
          type: "reading",
          duration: "30:00",
          description: "Ejercicio práctico para aplicar los conocimientos adquiridos.",
        },
      ],
    },
    {
      id: 3,
      title: "Next.js Avanzado",
      expanded: false,
      lessons: [
        {
          id: 9,
          title: "Routing en Next.js",
          type: "video",
          duration: "25:45",
          videoUrl: "https://www.youtube.com/embed/ZVnjOPwW4ZA",
          description: "Sistema de routing avanzado en Next.js.",
        },
      ],
    },
  ],
}

// ============================================
// VARIABLES GLOBALES
// ============================================

let leccionActual = null

// ============================================
// FUNCIONES PRINCIPALES EXPORTADAS
// ============================================

// Función para inicializar el curso
export function setupCourse() {
  // Encontrar lección actual
  leccionActual = encontrarLeccionActual()

  // Renderizar contenido
  mostrarContenidoCurso()
  configurarEventos()

  // Mostrar lección actual si existe
  if (leccionActual) {
    actualizarInfoLeccion(leccionActual)
    actualizarInterfazContenido(leccionActual)
  }
}

// Función para limpiar eventos (útil para SPA)
export function limpiarCurso() {
  leccionActual = null
  const contenedor = document.getElementById("courseContent")
  if (contenedor) contenedor.innerHTML = ""
}

// Función para obtener datos del curso
export function obtenerDatosCurso() {
  return datosCurso
}

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

// Mostrar contenido del curso en la barra lateral
export function mostrarContenidoCurso() {
  const contenedor = document.getElementById("courseContent")
  if (!contenedor) return

  contenedor.innerHTML = ""

  datosCurso.sections.forEach((seccion) => {
    const elementoSeccion = crearElementoSeccion(seccion)
    contenedor.appendChild(elementoSeccion)
  })
}

// Crear elemento de sección
function crearElementoSeccion(seccion) {
  const divSeccion = document.createElement("div")
  divSeccion.className = "border-b border-gray-200"

  const botonEncabezado = document.createElement("button")
  botonEncabezado.className =
    "w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
  botonEncabezado.onclick = () => alternarSeccion(seccion.id)

  botonEncabezado.innerHTML = `
    <span class="font-medium text-gray-800">${seccion.title}</span>
    <svg class="w-5 h-5 transform transition-transform duration-200 ${seccion.expanded ? "rotate-180" : ""}" 
         fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  `

  const contenidoLecciones = document.createElement("div")
  contenidoLecciones.className = `${seccion.expanded ? "block" : "hidden"}`

  seccion.lessons.forEach((leccion) => {
    const elementoLeccion = crearElementoLeccion(leccion)
    contenidoLecciones.appendChild(elementoLeccion)
  })

  divSeccion.appendChild(botonEncabezado)
  divSeccion.appendChild(contenidoLecciones)

  return divSeccion
}

// Crear elemento de lección
function crearElementoLeccion(leccion) {
  const divLeccion = document.createElement("div")
  divLeccion.className = `p-4 pl-8 hover:bg-gray-50 cursor-pointer border-l-4 transition-all duration-200 ${
    leccion.current ? "border-primary-hover bg-blue-50" : "border-transparent"
  }`
  divLeccion.onclick = () => seleccionarLeccion(leccion)

  const icono = obtenerIconoLeccion(leccion)

  divLeccion.innerHTML = `
    <div class="flex items-center space-x-3">
        <div class="flex-1">
            <div class="flex items-center space-x-2">
                ${icono}
                <span class="text-sm font-medium text-gray-800">${leccion.title}</span>
            </div>
            <div class="flex items-center space-x-2 mt-1">
                <span class="text-xs text-gray-500 capitalize">${leccion.type}</span>
                <span class="text-xs text-gray-500">${leccion.duration}</span>
            </div>
        </div>
    </div>
  `

  return divLeccion
}

// ============================================
// FUNCIONES DE INTERACCIÓN
// ============================================

// Alternar sección
export function alternarSeccion(idSeccion) {
  const seccion = datosCurso.sections.find((s) => s.id === idSeccion)
  if (seccion) {
    seccion.expanded = !seccion.expanded
    mostrarContenidoCurso()
  }
}

// Seleccionar lección
export function seleccionarLeccion(leccion) {
  // Quitar marca actual de todas las lecciones
  datosCurso.sections.forEach((seccion) => {
    seccion.lessons.forEach((l) => (l.current = false))
  })

  // Marcar nueva lección como actual
  leccion.current = true
  leccionActual = leccion

  // Actualizar interfaz
  actualizarInfoLeccion(leccion)
  actualizarInterfazContenido(leccion)
  mostrarContenidoCurso()
}

// Actualizar información de la lección
export function actualizarInfoLeccion(leccion) {
  const elementos = {
    lessonTitle: document.getElementById("lessonTitle"),
    videoDuration: document.getElementById("videoDuration"),
    lessonDescription: document.getElementById("lessonDescription"),
    durationBadge: document.getElementById("durationBadge"),
    typeBadge: document.getElementById("typeBadge"),
  }

  if (elementos.lessonTitle) elementos.lessonTitle.textContent = leccion.title
  if (elementos.videoDuration) elementos.videoDuration.textContent = leccion.duration
  if (elementos.lessonDescription)
    elementos.lessonDescription.textContent = leccion.description || "Descripción no disponible"
  if (elementos.durationBadge) elementos.durationBadge.textContent = leccion.duration

  if (elementos.typeBadge) {
    const coloresTipo = {
      video: "bg-primary-hover text-primary-white",
      quiz: "bg-orange-500 text-white",
      reading: "bg-purple-500 text-white",
    }

    elementos.typeBadge.className = `px-3 py-1 rounded-full text-sm font-medium ${coloresTipo[leccion.type]}`
    elementos.typeBadge.textContent = leccion.type.charAt(0).toUpperCase() + leccion.type.slice(1)
  }
}

// Actualizar interfaz de contenido
export function actualizarInterfazContenido(leccion) {
  // Ocultar todos los contenedores
  const contenedores = ["videoContainer", "quizContainer", "readingContainer"]
  contenedores.forEach((id) => {
    const elemento = document.getElementById(id)
    if (elemento) elemento.classList.add("hidden")
  })

  // Mostrar contenedor apropiado
  switch (leccion.type) {
    case "video":
      mostrarInterfazVideo(leccion)
      break
    case "quiz":
      mostrarInterfazQuiz()
      break
    case "reading":
      mostrarInterfazLectura()
      break
  }
}

// ============================================
// FUNCIONES DE INTERFAZ ESPECÍFICAS
// ============================================

// Mostrar interfaz de video
function mostrarInterfazVideo(leccion) {
  const videoContainer = document.getElementById("videoContainer")
  const youtubePlayer = document.getElementById("youtubePlayer")
  const videoPlaceholder = document.getElementById("videoPlaceholder")

  if (!videoContainer) return

  videoContainer.classList.remove("hidden")

  // Resetear interfaz
  if (youtubePlayer) {
    youtubePlayer.classList.add("hidden")
    youtubePlayer.src = ""
  }
  if (videoPlaceholder) videoPlaceholder.classList.remove("hidden")

  // Configurar URL del video
  if (leccion.videoUrl && youtubePlayer) {
    youtubePlayer.src = leccion.videoUrl + "?rel=0"
  }
}

// Mostrar interfaz de quiz
function mostrarInterfazQuiz() {
  const contenedor = document.getElementById("quizContainer")
  if (contenedor) contenedor.classList.remove("hidden")
}

// Mostrar interfaz de lectura
function mostrarInterfazLectura() {
  const contenedor = document.getElementById("readingContainer")
  if (contenedor) contenedor.classList.remove("hidden")
}

// ============================================
// FUNCIONES DE EVENTOS
// ============================================

// Reproducir video
export function reproducirVideo() {
  if (leccionActual && leccionActual.type === "video" && leccionActual.videoUrl) {
    const youtubePlayer = document.getElementById("youtubePlayer")
    const videoPlaceholder = document.getElementById("videoPlaceholder")

    if (youtubePlayer) youtubePlayer.classList.remove("hidden")
    if (videoPlaceholder) videoPlaceholder.classList.add("hidden")
  }
}

// Iniciar quiz
export function iniciarQuiz() {
  console.log("Iniciando quiz:", leccionActual?.title)
  mostrarNotificacion("Quiz iniciado")
}

// Iniciar lectura
export function iniciarLectura() {
  console.log("Iniciando lectura:", leccionActual?.title)
  mostrarNotificacion("Lectura iniciada")
}

// Regresar
export function regresarAtras() {
  // Emitir evento para SPA
  const evento = new CustomEvent("courseNavigation", {
    detail: { action: "back" },
  })
  window.dispatchEvent(evento)
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Encontrar lección actual
function encontrarLeccionActual() {
  for (const seccion of datosCurso.sections) {
    const leccionActual = seccion.lessons.find((leccion) => leccion.current)
    if (leccionActual) return leccionActual
  }
  return null
}

// Obtener icono de lección
function obtenerIconoLeccion(leccion) {
  const iconos = {
    video:
      '<svg class="w-4 h-4 text-primary-hover" fill="currentColor" viewBox="0 0 20 20"><path d="M8 5v10l8-5-8-5z"></path></svg>',
    quiz: '<svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>',
    reading:
      '<svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V4.804z"></path></svg>',
  }
  return iconos[leccion.type] || iconos.video
}

// Mostrar notificación
export function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement("div")
  notificacion.className =
    "fixed top-4 right-4 bg-primary-blue text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300"
  notificacion.textContent = mensaje

  document.body.appendChild(notificacion)

  setTimeout(() => {
    notificacion.classList.add("opacity-0", "translate-x-full")
    setTimeout(() => {
      if (document.body.contains(notificacion)) {
        document.body.removeChild(notificacion)
      }
    }, 300)
  }, 2000)
}

// Configurar eventos
export function configurarEventos() {
  // Botón de reproducir
  const playBtn = document.getElementById("playBtn")
  if (playBtn) {
    playBtn.addEventListener("click", reproducirVideo)
  }

  // Botón de quiz
  const startQuizBtn = document.getElementById("startQuizBtn")
  if (startQuizBtn) {
    startQuizBtn.addEventListener("click", iniciarQuiz)
  }

  // Botón de lectura
  const startReadingBtn = document.getElementById("startReadingBtn")
  if (startReadingBtn) {
    startReadingBtn.addEventListener("click", iniciarLectura)
  }

  // Botón de regresar
  const backBtn = document.getElementById("backBtn")
  if (backBtn) {
    backBtn.addEventListener("click", regresarAtras)
  }
}

// ============================================
// OBJETO PRINCIPAL PARA SPA
// ============================================

export const CourseApp = {
  // Funciones principales
  setupCourse,
  limpiarCurso,
  obtenerDatosCurso,

  // Funciones de interacción
  seleccionarLeccion,
  alternarSeccion,
  reproducirVideo,
  iniciarQuiz,
  iniciarLectura,

  // Funciones de interfaz
  mostrarContenidoCurso,
  actualizarInfoLeccion,
  actualizarInterfazContenido,
  mostrarNotificacion,

  // Navegación
  regresarAtras,
}

// Hacer disponible globalmente
window.CourseApp = CourseApp

// ============================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Solo inicializar si no hay router
  if (!window.router) {
    setupCourse()
  }
})
