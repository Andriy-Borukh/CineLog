import { useState, useEffect } from 'react';
import { usePeliculas } from '../hooks/usePeliculas';
import { Link } from 'react-router-dom';

function Buscar() {
  const [termino, setTermino] = useState('');
  const [terminoDebounced, setTerminoDebounced] = useState('');
  
  // Estados para los filtros solicitados
  const [filtroAño, setFiltroAño] = useState('');
  const [filtroPuntuacion, setFiltroPuntuacion] = useState(0);

  // Implementación del Debounce para el buscador en tiempo real
  useEffect(() => {
    const temporizador = setTimeout(() => {
      setTerminoDebounced(termino);
    }, 500); // Espera 500ms tras dejar de escribir antes de lanzar la petición

    return () => clearTimeout(temporizador);
  }, [termino]);

  // Usamos el hook personalizado. Si hay término busca, si no, traemos descubrimientos generalizados (discover/movie)
  const rutaApi = terminoDebounced ? 'search/movie' : 'discover/movie';
  const { peliculas, cargando, error, esVacio } = usePeliculas(rutaApi, terminoDebounced);

  // Aplicación de los filtros combinados por código sobre los resultados de la API
  const peliculasFiltradas = peliculas.filter(pelicula => {
    const cumpleAño = filtroAño ? (pelicula.release_date && pelicula.release_date.startsWith(filtroAño)) : true;
    const cumplePuntuacion = pelicula.vote_average >= filtroPuntuacion;
    return cumpleAño && cumplePuntuacion;
  });

  return (
    <div className="pagina-buscar" style={{ padding: '20px' }}>
      <h2>🔍 Buscador Avanzado</h2>

      {/* Input de búsqueda en tiempo real */}
      <input 
        type="text" 
        placeholder="Escribe el nombre de una película..." 
        value={termino} 
        onChange={(e) => setTermino(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '20px' }}
      />

      {/* Bloque de Filtros obligatorios */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        <div>
          <label>Año de estreno: </label>
          <input type="number" placeholder="Ej: 2024" value={filtroAño} onChange={(e) => setFiltroAño(e.target.value)} style={{ width: '80px' }} />
        </div>
        <div>
          <label>Puntuación mínima ({filtroPuntuacion}): </label>
          <input type="range" min="0" max="10" step="0.5" value={filtroPuntuacion} onChange={(e) => setFiltroPuntuacion(Number(e.target.value))} />
        </div>
      </div>

      {cargando && <p>Buscando resultados...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!cargando && esVacio && <p>No se encontraron resultados para tu búsqueda.</p>}

      {/* Resultados */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
        {peliculasFiltradas.map(pelicula => (
          <div key={pelicula.id} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
            <h4>{pelicula.title}</h4>
            <p>⭐ {pelicula.vote_average.toFixed(1)}</p>
            <Link to={`/pelicula/${pelicula.id}`} style={{ color: '#007bff', fontSize: '0.9rem' }}>Detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buscar;