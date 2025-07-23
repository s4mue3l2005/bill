import { mostrarContenidoCurso } from './render.js'
import {
  encontrarLeccionActual,
  actualizarInfoLeccion,
  actualizarInterfazContenido,
  configurarEventos
} from './helpers.js'

let leccionActual = null

export function inicializarCurso() {
  leccionActual = encontrarLeccionActual()
  mostrarContenidoCurso()
  configurarEventos()

  if (leccionActual) {
    actualizarInfoLeccion(leccionActual)
    actualizarInterfazContenido(leccionActual)
  }
}

export function limpiarCurso() {
  leccionActual = null
  const contenedor = document.getElementById("courseContent")
  if (contenedor) contenedor.innerHTML = ""
}
