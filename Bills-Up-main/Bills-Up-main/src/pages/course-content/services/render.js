import { alternarSeccion, seleccionarLeccion, obtenerIconoLeccion } from './helpers.js'
import { datosCurso } from './datos.js'

export function mostrarContenidoCurso() {
  const contenedor = document.getElementById("courseContent")
  if (!contenedor) return

  contenedor.innerHTML = ""

  datosCurso.sections.forEach((seccion) => {
    const elementoSeccion = crearElementoSeccion(seccion)
    contenedor.appendChild(elementoSeccion)
  })
}

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
