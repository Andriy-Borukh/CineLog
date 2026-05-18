import { useState } from 'react';
import { usePeliculas } from '../hooks/usePeliculas';
import { useListaUsuario } from '../hooks/useListaUsuario';
import { Link } from 'react-router-dom';

function Inicio() {
  const [categoria, setCategoria] = useState('movie/popular'); // popular, now_playing, top_rated
  const [pagina, setPagina] = useState(1);
  const { peliculas, cargando, error } = usePeliculas(categoria, '', pagina);
  const { estaEnLista } = useListaUsuario();

  const cambiarCategoria = (nuevaCategoria) => {
    setCategoria(nuevaCategoria);
    setPagina(1); // Reiniciar paginación al cambiar de sección
  };

  return (
    <div className="pagina-inicio" style={{ padding: '20px' }}>
      <h2>🎬 Catálogo de Películas</h2>
      
      {/* Selector de categorías de TMDB */}
      <div style={{ marginBottom: '20px', gap: '10px', display: 'flex' }}>
        <button onClick={() => cambiarCategoria('movie/popular')} disabled={categoria === 'movie/popular'}>Populares</button>
        <button onClick={() => cambiarCategoria('movie/now_playing')} disabled={categoria === 'movie/now_playing'}>En Cartelera</button>
        <button onClick={() => cambiarCategoria('movie/top_rated')} disabled={categoria === 'movie/top_rated'}>Mejor Valoradas</button>
      </div>

      {cargando && <p>Cargando películas...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Requisito: Mostrar catálogo real */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {peliculas.map(pelicula => {
          // Requisito: Indicador visual según si está en alguna lista del usuario
          const esVista = estaEnLista('vistas', pelicula.id);
          const esPendiente = estaEnLista('pendientes', pelicula.id);
          const esFavorita = estaEnLista('favoritas', pelicula.id);

          return (
            <div key={pelicula.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', position: 'relative' }}>
              <img 
                src={pelicula.poster_path ? `https://image.tmdb.org/t/p/w200${pelicula.poster_path}` : 'https://via.placeholder.com/200x300?text=Sin+Poster'} 
                alt={pelicula.title} 
                style={{ width: '100%', borderRadius: '4px' }}
              />
              <h3>{pelicula.title}</h3>
              <p>Estreno: {pelicula.release_date || 'No disponible'}</p>
              
              {/* Indicadores visuales solicitados */}
              <div style={{ fontSize: '0.8rem', margin: '5px 0', color: '#555' }}>
                {esVista && '👁️ Vista '}
                {esPendiente && '⏳ Pendiente '}
                {esFavorita && '❤️ Favorita'}
              </div>

              <Link to={`/pelicula/${pelicula.id}`} style={{ display: 'inline-block', marginTop: '10px', color: '#007bff' }}>
                Ver detalle
              </Link>
            </div>
          );
        })}
      </div>

      {/* Requisito: Paginación */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>Anterior</button>
        <span>Página {pagina}</span>
        <button onClick={() => setPagina(p => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
}

export default Inicio;