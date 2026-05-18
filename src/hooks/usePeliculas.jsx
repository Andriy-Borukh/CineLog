import { useState, useEffect } from 'react';
import { obtenerPeliculasDeAPI } from '../servicios/apiTMDB';

export function usePeliculas(endpoint, parametroBusqueda = '', pagina = 1) {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definimos la función para limpiar o cargar datos
    const gestionarPeticion = async () => {
      // Si es una búsqueda pero el término está vacío, vaciamos el estado de forma segura
      if (endpoint === 'search' && !parametroBusqueda.trim()) {
        setPeliculas([]);
        setError(null);
        return;
      }

      setCargando(true);
      setError(null);

      try {
  // CONFIGURACIÓN CORRECTA:
  // Solo le pasamos el parámetro 'query' si realmente estamos buscando algo en 'search/movie'.
  // Si estamos en populares ('movie/popular'), solo le pasamos la página.
  const parametrosApi = endpoint.includes('search') 
    ? { query: parametroBusqueda, page: pagina }
    : { page: pagina };

  const datos = await obtenerPeliculasDeAPI(endpoint, parametrosApi);
  
  if (datos && datos.results) {
    setPeliculas(datos.results);
  } else {
    setPeliculas([]);
  }
} catch (err) {
  console.error('Error al capturar películas de TMDB:', err);
  setError('No se pudieron cargar las películas. Inténtalo de nuevo.');
}
    };

    gestionarPeticion();
  }, [endpoint, parametroBusqueda, pagina]);

  return { peliculas, cargando, error, esVacio: peliculas.length === 0 };
}