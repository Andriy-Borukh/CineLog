import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerPeliculasDeAPI } from '../servicios/apiTMDB';
import { useListaUsuario } from '../hooks/useListaUsuario';

function DetallePelicula() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  const { agregarALista, eliminarDeLista, estaEnLista, valorarPelicula, listas } = useListaUsuario();

  // Estados locales para el formulario de valoración (Puntuación y Reseña)
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    async function cargarDetalle() {
      try {
        const datos = await obtenerPeliculasDeAPI(`movie/${id}`);
        setPelicula(datos);
        
        // Si el usuario ya la había reseñado previamente, cargamos sus datos del estado global
        const guardadaEnVistas = listas.vistas.find(p => p.id === Number(id));
        if (guardadaEnVistas) {
          setNota(guardadaEnVistas.puntuacionUsuario || 5);
          setComentario(guardadaEnVistas.resenaUsuario || '');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    }
    cargarDetalle();
  }, [id, listas.vistas]);

  if (cargando) return <p>Cargando detalles de la película...</p>;
  if (!pelicula) return <p>No se pudo encontrar la información.</p>;

  // Comprobar pertenencia a listas
  const esVista = estaEnLista('vistas', pelicula.id);
  const esPendiente = estaEnLista('pendientes', pelicula.id);
  const esFavorita = estaEnLista('favoritas', pelicula.id);

  const gestionarGuardadoLista = (nombreLista, activo) => {
    if (activo) {
      eliminarDeLista(nombreLista, pelicula.id);
    } else {
      agregarALista(nombreLista, pelicula);
    }
  };

  const enviarReview = (e) => {
    e.preventDefault();
    valorarPelicula(pelicula.id, nota, comentario);
    alert('¡Valoración guardada!');
  };

  return (
    <div className="detalle-pelicula" style={{ padding: '20px', display: 'flex', gap: '30px' }}>
      <div style={{ width: '300px' }}>
        <img src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`} alt={pelicula.title} style={{ width: '100%', borderRadius: '8px' }} />
      </div>
      
      <div style={{ flex: 1 }}>
        <h1>{pelicula.title}</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>{pelicula.tagline}</p>
        
        <h3>Sinopsis</h3>
        <p>{pelicula.overview || 'Sin sinopsis disponible.'}</p>
        
        <p><strong>Duración:</strong> {pelicula.runtime} minutos</p>
        <p><strong>Géneros:</strong> {pelicula.genres?.map(g => g.name).join(', ')}</p>

        {/* Sección de Gestión de Listas Personales */}
        <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
          <button onClick={() => gestionarGuardadoLista('vistas', esVista)} style={{ background: esVista ? '#28a745' : '#ccc', color: '#fff' }}>
            {esVista ? '👁️ Vista' : 'Marcar como Vista'}
          </button>
          <button onClick={() => gestionarGuardadoLista('pendientes', esPendiente)} style={{ background: esPendiente ? '#ffc107' : '#ccc', color: '#000' }}>
            {esPendiente ? '⏳ En Pendientes' : 'Añadir a Pendientes'}
          </button>
          <button onClick={() => gestionarGuardadoLista('favoritas', esFavorita)} style={{ background: esFavorita ? '#dc3545' : '#ccc', color: '#fff' }}>
            {esFavorita ? '❤️ En Favoritas' : 'Añadir a Favoritas'}
          </button>
        </div>

        {/* Requisito: Si está en la lista de "Vistas", permitir puntuar (1-10) y dejar reseña breve */}
        {esVista && (
          <form onSubmit={enviarReview} style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h4>Tu Diario Personal (Reseña)</h4>
            <div style={{ marginBottom: '10px' }}>
              <label>Puntuación (1 al 10): </label>
              <input type="number" min="1" max="10" value={nota} onChange={(e) => setNota(Number(e.target.value))} required style={{ width: '50px', marginLeft: '10px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block' }}>Tu comentario breve:</label>
              <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ width: '100%', height: '60px' }} placeholder="¿Qué te ha parecido la película?" />
            </div>
            <button type="submit">Guardar Reseña</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default DetallePelicula;