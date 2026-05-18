import { Link } from 'react-router-dom';

function BarraNavegacion() {
  return (
    <nav style={{ padding: '1rem', background: '#222', color: '#fff' }}>
      <ul style={{ display: 'flex', gap: '15px', listStyle: 'none' }}>
        <li><Link to="/" style={{ color: '#fff' }}>Inicio</Link></li>
        <li><Link to="/buscar" style={{ color: '#fff' }}>Buscar</Link></li>
        <li><Link to="/perfil" style={{ color: '#fff' }}>Perfil</Link></li>
      </ul>
    </nav>
  );
}
export default BarraNavegacion;