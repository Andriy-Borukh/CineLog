import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProveedorUsuario } from './contexto/ContextoUsuario';

// Páginas ficticias
import Inicio from './paginas/Inicio';
import Buscar from './paginas/Buscar';
import DetallePelicula from './paginas/DetallePelicula';
import Perfil from './paginas/Perfil';
import BarraNavegacion from './componentes/BarraNavegacion';

function App() {
  return (
    <ProveedorUsuario>
      <BrowserRouter>
        <BarraNavegacion /> {/* Menú de navegación global */}
        <main className="contenedor-principal">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/pelicula/:id" element={<DetallePelicula />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProveedorUsuario>
  );
}

export default App;