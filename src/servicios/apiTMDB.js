// src/servicios/apiTMDB.js
const URL_BASE = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY; 

export async function obtenerPeliculasDeAPI(ruta, parametros = {}) {
  // Construimos los parámetros obligatorios
  const parametrosQuery = new URLSearchParams({
    api_key: API_KEY,
    language: 'es-ES',
    ...parametros
  });

  // IMPORTANTE: Unir la URL_BASE con la ruta que viene del componente
  const urlCompleta = `${URL_BASE}/${ruta}?${parametrosQuery.toString()}`;

  const respuesta = await fetch(urlCompleta);
  if (!respuesta.ok) {
    throw new Error(`Error en la petición: ${respuesta.status}`);
  }
  return await respuesta.json();
}