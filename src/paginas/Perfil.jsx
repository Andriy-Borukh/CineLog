import { useListaUsuario } from '../hooks/useListaUsuario';
import { Link } from 'react-router-dom';

function Perfil() {
  const { listas, eliminarDeLista } = useListaUsuario();

  // --- CÁLCULO DE ESTADÍSTICAS OBLIGATORIAS ---
  const totalVistas = listas.vistas.length;

  // 1. Puntuación media de las películas valoradas
  const puntuacionMedia = totalVistas > 0 
    ? (listas.vistas.reduce((acumulador, pelicula) => acumulador + (pelicula.puntuacionUsuario || 0), 0) / totalVistas).toFixed(1)
    : 0;

  // 2. Cálculo del género favorito (el más repetido en la lista de vistas)
  let generoFavorito = 'Ninguno';
  if (totalVistas > 0) {
    const mapaGeneros = {};
    listas.vistas.forEach(p => {
      p.genres?.forEach(g => {
        mapaGeneros[g.name] = (mapaGeneros[g.name] || 0) + 1;
      });
    });
    
    // Buscar el que tenga el conteo más alto
    let maximoContador = 0;
    Object.entries(mapaGeneros).forEach(([nombre, conteo]) => {
      if (conteo > maximoContador) {
        maximoContador = conteo;
        generoFavorito = nombre;
      }
    });
  }

  return (
    <div className="pagina-perfil" style={{ padding: '20px' }}>
      <h2>👤 Mi Perfil CineLog</h2>

      {/* Cuadro de Estadísticas */}
      <div style={{ display: 'flex', gap: '30px', background: '#e9ecef', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <div>
          <h3>{totalVistas}</h3>
          <p>Películas Vistas</p>
        </div>
        <div>
          <h3>⭐ {puntuacionMedia}</h3>
          <p>Puntuación Media</p>
        </div>
        <div>
          <h3>🎭 {generoFavorito}</h3>
          <p>Género Favorito</p>
        </div>
      </div>

      {/* RENDERIZADO DE LAS TRES LISTAS */}
      
      {/* 1. Lista de Favoritas */}
      <section style={{ marginBottom: '30px' }}>
        <h3>❤️ Mis Favoritas ({listas.favoritas.length})</h3>
        {listas.favoritas.length === 0 ? <p>No has añadido películas a favoritos.</p> : (
          <ul style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0', listStyle: 'none' }}>
            {listas.favoritas.map(p => (
              <li key={p.id} style={{ border: '1px solid #ddd', padding: '10px', minWidth: '150px' }}>
                <h5>{p.title}</h5>
                <button onClick={() => eliminarDeLista('favoritas', p.id)} style={{ fontSize: '0.8rem' }}>Quitar</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 2. Lista de Pendientes */}
      <section style={{ marginBottom: '30px' }}>
        <h3>⏳ Por Ver / Pendientes ({listas.pendientes.length})</h3>
        {listas.pendientes.length === 0 ? <p>No tienes películas pendientes.</p> : (
          <ul style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0', listStyle: 'none' }}>
            {listas.pendientes.map(p => (
              <li key={p.id} style={{ border: '1px solid #ddd', padding: '10px', minWidth: '150px' }}>
                <h5>{p.title}</h5>
                <button onClick={() => eliminarDeLista('pendientes', p.id)} style={{ fontSize: '0.8rem' }}>Quitar</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 3. Lista de Vistas con sus reseñas */}
      <section style={{ marginBottom: '30px' }}>
        <h3>👁️ Diario de Películas Vistas ({totalVistas})</h3>
        {listas.vistas.length === 0 ? <p>Aún no has registrado ninguna película como vista.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {listas.vistas.map(p => (
              <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', background: '#fff' }}>
                <h4><Link to={`/pelicula/${p.id}`}>{p.title}</Link></h4>
                <p><strong>Tu Nota:</strong> ⭐ {p.puntuacionUsuario || 'Sin nota'} / 10</p>
                <p><strong>Tu Reseña:</strong> <i>"{p.resenaUsuario || 'Sin comentario escrito.'}"</i></p>
                <button onClick={() => eliminarDeLista('vistas', p.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Eliminar del diario</button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default Perfil;